class Profile < ApplicationRecord
  has_many :collaborators
  has_many :events, through: :collaborators
end
