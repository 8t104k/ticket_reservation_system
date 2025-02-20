class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :event_name
      t.datetime :event_date
      t.integer :status
      t.string :token

      t.timestamps
    end
    add_index :events, :token, unique: true
  end
end
