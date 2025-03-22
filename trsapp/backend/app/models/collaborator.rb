class Collaborator < ApplicationRecord
  belongs_to :event
  belongs_to :profile

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
end
