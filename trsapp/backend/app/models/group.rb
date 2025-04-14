class Group < ApplicationRecord
  include Generatetoken
  has_and_belongs_to_many :profiles
  has_many :collaborators
  has_many :event, through: :collaborators

  def attribute_names_for_serialization
    %i[token group_name img_url description]
  end
end
