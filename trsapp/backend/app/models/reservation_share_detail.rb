class ReservationShareDetail < ApplicationRecord
  include Generatetoken
  include ActiveModel::Serializers::JSON

  belongs_to :reservation_share
  
  def as_json(_options = {})
    json = super(only: [:id, :token, :font_info, :color_palet, :background_img])
    add_event_attributes(json)
    json
  end

  def add_event_attributes(json)
    return unless reservation_share&.event.present?
    event = reservation_share.event
    json[:event_name] = event.event_name
    json[:event_date] = event.event_date
    # json[:location] = event.location
    json[:status] = event.status
  end
end
