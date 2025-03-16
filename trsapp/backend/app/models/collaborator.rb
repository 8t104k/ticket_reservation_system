class Collaborator < ApplicationRecord
  belongs_to :event
  belongs_to :profile
  belongs_to :auth_connection
end
