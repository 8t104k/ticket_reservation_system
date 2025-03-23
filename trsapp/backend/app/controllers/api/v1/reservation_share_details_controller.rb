class Api::V1::ReservationShareDetailsController < ApplicationController
  def show
    @share_page = ReservationShareDetail.includes(reservation_share: :event).find_by(token: params[:detail_token])
    render json: @share_page.as_json
  end
end
