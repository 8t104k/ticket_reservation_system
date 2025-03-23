class ReservationShareDetail < ApplicationRecord
  include Generatetoken
  belongs_to :reservation_share
end
