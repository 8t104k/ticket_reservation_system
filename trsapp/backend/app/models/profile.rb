class Profile < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_many :collaborators
  has_many :events, through: :collaborators

  def as_details_json
    serializable_hash(only: [:username, :display_name, :avatar_url, :email])
  end

  private
  def attribute_names_for_serialization
    %i[username display_name avatar_url]
  end
end
