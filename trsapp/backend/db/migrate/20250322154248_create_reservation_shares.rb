class CreateReservationShares < ActiveRecord::Migration[7.1]
  def change
    create_table :reservation_shares do |t|
      t.references :event, null: false, foreign_key: true
      t.references :collaborator, null: false, foreign_key: true
      t.string :token
      t.datetime :expires_at
      t.string :status

      t.timestamps
    end

    add_index :reservation_shares, :token, unique: true
  end
end
