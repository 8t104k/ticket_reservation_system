class Reservation < ApplicationRecord
  include ActiveModel::Serializers::JSON

  belongs_to :event

  enum status: {
    reserved: 10,
    invited: 11,
    checked_in: 20,
    cancel: 90
  }
  
  private
  def attribute_names_for_serialization
    %i[reservation_name price status reserved_at]
  end
end
