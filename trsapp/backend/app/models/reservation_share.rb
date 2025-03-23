class ReservationShare < ApplicationRecord
  include Generatetoken
  belongs_to :event
  belongs_to :collaborator
  has_many :reservation_share_detail
  enum status: {
    draft: "draft",
    open: "open",
    close: "close",
    deleted: "deleted"
  }
  
end
