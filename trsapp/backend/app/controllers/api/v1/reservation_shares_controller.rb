class Api::V1::ReservationSharesController < ApplicationController
  before_action :set_event, only: %i[create show]
  skip_before_action :authenticate_user, only: %i[invite]

  def create
    # 発行済みチェック
    if @event.reservation_share
      return render json: { error: "すでに予約招待URLを発行済みです。" }, status: :unprocessable_entity
    end

    ReservationShare.transaction do
      @reservation_share = @event.build_reservation_share
      
      collaborator = @event.collaborators.find_by(profile_id: @current_user.id)
      # Collaboratorsにいるかチェック
      return render json: { error: "イベントの共演者に登録されていません。" }, status: :forbidden unless collaborator

      @reservation_share.collaborator_id = collaborator.id
      @reservation_share.draft!
      @reservation_share.background_img = "test_bg.webp"
      @reservation_share.font_info = {"size"=>"16px", "family"=>"Roboto", "weight"=>400}
      @reservation_share.color_info = {"text"=>"#303030", "primary"=>"#FF9800", "secondary"=>"#FFCC80", "background"=>"#F5F5F5"}
      @reservation_share.save!
      render json: @reservation_share, status: :created
    rescue => e
      Rails.logger.error("予約シェア作成エラー: #{e.message}")
      return render json: { error: "予約シェア作成中にエラーが発生しました" }, status: :internal_server_error
    end
  end

  def show
    @share_page = ReservationShare.includes(:event).find_by(event: @event.id)
    render json: @share_page
  end

  def invite
    @reservation_share = ReservationShare.joins(:event).select("reservation_shares.*, events.*").find_by(token: params[:token])
    @all_groups = @reservation_share.event.groups
    @share_page = @reservation_share.as_json_for_invitation.merge(groups: @all_groups.as_json)
    #@all_collaborators = @reservation_share.event.collaborators.includes(:group).joins(:profile).select("collaborators.*, profiles.display_name")
    #@share_page = @reservation_share.as_json_for_invitation.merge(collaborators: @all_collaborators.as_json(include: :group, methods: [:display_name])) 
    render json: @share_page
  end

  private
  def set_event
    @event = Event.find_by!(token: params[:event_token])
  end
end
