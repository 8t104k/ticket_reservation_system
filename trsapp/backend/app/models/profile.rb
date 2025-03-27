class Profile < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_many :collaborators
  has_many :events, through: :collaborators

  def as_details_json
    attributes.except("user_id")
  end

  def attribute_names_for_serialization
    %i[username display_name avatar_url]
  end
end
