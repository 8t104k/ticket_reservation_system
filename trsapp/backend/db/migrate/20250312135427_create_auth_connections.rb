class CreateAuthConnections < ActiveRecord::Migration[7.1]
  def change
    create_table :auth_connections do |t|
      t.string :user_id, null: false
      t.datetime :last_verified_at

      t.timestamps
    end

    add_index :auth_connections, :user_id, unique: true
  end
end
