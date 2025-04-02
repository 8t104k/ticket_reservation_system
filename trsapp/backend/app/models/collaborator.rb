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
    %i[id role access_status]
  end
end
