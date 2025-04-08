class ReservationShare < ApplicationRecord
  include Generatetoken
  include ActiveModel::Serializers::JSON

  belongs_to :event
  belongs_to :collaborator
  has_many :reservation_share_details, dependent: :destroy
  enum status: {
    draft: "draft",
    open: "open",
    close: "close",
    deleted: "deleted"
  }
  
  def as_json(_options = {})
    json = super(only: %i[id token font_info color_info background_img extracted_colors])
    add_event_attributes(json)
    json
  end

  def add_event_attributes(json)
    return unless event.present?
    json[:event_name] = event.event_name
    json[:event_date] = event.event_date
    json[:location] = event.location
    json[:status] = event.status
  end

  private
#  def attribute_names_for_serialization
#    %i[id token font_info color_info background_img extracted_colors expires_at status]
#  end

end
