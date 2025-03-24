class Api::V1::ReservationSharesController < ApplicationController
  before_action :set_event, only: %i[create index]

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
      @reservation_share.save!

      @rs_detail = @reservation_share.reservation_share_details.new
      @rs_detail.save!
      render json: @reservation_share, status: :created
    rescue => e
      Rails.logger.error("予約シェア作成エラー: #{e.message}")
      return render json: { error: "予約シェア作成中にエラーが発生しました" }, status: :internal_server_error
    end
  end

  def index
    @reservation_shares = @event.reservation_shares
    render json: @reservation_shares
  end

  private
  def set_event
    @event = Event.find_by!(token: params[:event_token])
  end
end
