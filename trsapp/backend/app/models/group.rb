class Group < ApplicationRecord
  include Generatetoken
  has_and_belongs_to_many :profiles
  has_many :collaborators
end
