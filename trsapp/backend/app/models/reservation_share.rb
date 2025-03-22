class ReservationShare < ApplicationRecord
  belongs_to :event
  belongs_to :collaborator
end
