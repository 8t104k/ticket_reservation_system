class Group < ApplicationRecord
  include Generatetoken
  has_and_belongs_to_many :profiles
  has_many :collaborators

  def attribute_names_for_serialization
    %i[group_name img_url]
  end
end
