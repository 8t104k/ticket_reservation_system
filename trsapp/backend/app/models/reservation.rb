class Reservation < ApplicationRecord
  belongs_to :event
  include Generatetoken
end
