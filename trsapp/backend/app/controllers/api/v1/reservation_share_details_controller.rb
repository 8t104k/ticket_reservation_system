class Api::V1::ReservationShareDetailsController < ApplicationController
  def show
    @share_page = ReservationShareDetail.includes(reservation_share: :event).find_by(token: params[:detail_token])
    # @share_page = ReservationShareDetail.includes(:reservation_share).find_by(token: params[:detail_token])
    # @share_page = ReservationShare.includes(:reservation_share_details).find
    # 動作確認
    puts @share_page.token                      # ReservationShareDetailのトークン
    puts @share_page.reservation_share.token    # ReservationShareのトークン
    puts @share_page.reservation_share.event.event_name # イベント名
    
    render json: @share_page.as_json
  end
end
