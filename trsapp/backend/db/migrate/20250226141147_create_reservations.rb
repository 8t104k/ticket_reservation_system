class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :event, null: false, foreign_key: true
      t.string :reservation_name
      t.decimal :price
      t.string :status
      t.jsonb :customer_info
      t.datetime :reserved_at
      t.string :token
      t.datetime :expires_at

      t.timestamps
    end
  end
end
