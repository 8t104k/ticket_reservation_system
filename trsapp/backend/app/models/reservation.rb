class Reservation < ApplicationRecord
  include ActiveModel::Serializers::JSON
  include Generatetoken

  belongs_to :event
  
  private
  def attribute_names_for_serialization
    %i[reservation_name price status reserved_at]
  end
end
