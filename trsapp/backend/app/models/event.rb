class Event < ApplicationRecord
  include Generatetoken
  has_many :reservations, primary_key: :id, foreign_key: :event_id
  has_many :collaborators
end
