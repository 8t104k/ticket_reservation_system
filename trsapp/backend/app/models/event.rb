class Event < ApplicationRecord
  include Generatetoken
  has_many :reservations, primary_key: :id, foreign_key: :event_id
  has_many :collaborators
  has_many :profiles, through: :collaborators
  has_one :reservation_share

  enum status: {
    draft: 10,
    open: 20,
    close: 90,
    deleted: 99
  }

  scope :recent, -> { order(id: :desc) }

  def self.create_event(params)
    event = Event.new(params)
    event.draft!
    event.save!
    event
  end
end
