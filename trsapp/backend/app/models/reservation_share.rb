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

  private
  def attribute_names_for_serialization
    %i[token expires_at status]
  end
end
