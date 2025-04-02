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

  def self.create_with_owner(event_params, user)
    Event.transaction do
      event = Event.new(event_params)
      event.draft!
      event.save!
      event.add_organizer(user)
      return event
    end
  end

  # オーガナイザー（主催者）をコラボレーターに追加するメソッド
  def add_organizer(user)
    collaborators.create!(
      profile_id: user.user_id,
      role: Collaborator.roles[:organizer],
      access_status: Collaborator.access_status[:active]
    )
  end

end
