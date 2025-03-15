class CreateCollaborators < ActiveRecord::Migration[7.1]
  def change
    create_table :collaborators do |t|
      t.references :event, null: false, foreign_key: true
      t.uuid :user_id, null: false
      t.string :role
      t.string :access_status

      t.timestamps
    end

    add_index :collaborators, :user_id
    add_foreign_key :collaborators, :auth_connections, column: :user_id, primary_key: :user_id
  end
end
