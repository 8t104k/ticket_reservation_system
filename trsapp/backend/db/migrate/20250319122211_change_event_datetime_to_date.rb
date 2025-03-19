class ChangeEventDatetimeToDate < ActiveRecord::Migration[7.1]
  def change
    change_column :events, :event_date, :date
  end
  def down
    change_column :events, :event_date, :datetime
  end
end
