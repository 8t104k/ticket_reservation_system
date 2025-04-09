class Collaborator < ApplicationRecord
  belongs_to :event
  belongs_to :profile
  has_one :reservation_share
  belongs_to :group, optional: true

  enum role: {
    organizer: "org",
    member: "mem",
    staff: "stf",
    livehouse: "lvh"
  }
  enum access_status: {
    active: "act",
    inactive: "ina",
    pending: "pnd",
    inviting: "inv"
  }
  def attribute_names_for_serialization
    %i[position role access_status]
  end

  def display_name
    profile&.display_name
  end

  def self.add(event,profile,role: :member, access_status: :pending)
    Collaborator.transaction do
      existing = event.collaborators.find_by(profile_id: profile.id)
      return existing if existing.present?

      max_position = event.collaborators.maximum(:position) || 0
      event.collaborators.create!(
        profile_id: profile.id,
        role: role,
        access_status: access_status,
        position: max_position + 1
        )
    end
  rescue ActiveRecord::RecordInvalid => e
    raise StandardError, "collaboratorの追加に失敗: #{e.message}"
  end
end
