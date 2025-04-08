class AddColumnsToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :open_time, :datetime
    add_column :events, :start_time, :datetime
    add_column :events, :close_time, :datetime
    add_column :events, :location, :text
  end
end
