class Api::V1::ReservationSharesController < ApplicationController
  before_action :set_event

  def create
    ReservationShare.transaction do
      @reservation_share = @event.build_reservation_share
      @reservation_share.collaborator_id = @current_user.id
      @reservation_share.draft!
      @reservation_share.save
      @rs_detail = @reservation_share.reservation_share_detail.new
      @rs_detail.save
      render json: @reservation_share
    rescue => e
      Rails.logger.error("予約シェア作成エラー: #{e.message}")
      render json: { error: "予約シェア作成中にエラーが発生しました" }, status: :internal_server_error
    end
  end

  def index
    @reservation_share = @event.reservation_share
    render json: @reservation_share
  end

  private
  def set_event
    @event = Event.find_by!(token: params[:event_token])
  end
end
