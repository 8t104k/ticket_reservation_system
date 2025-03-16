class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.uuid :user_id
      t.string :username
      t.string :email
      t.string :display_name
      t.text :avatar_url

      t.timestamps
    end
    add_index :profiles, :user_id
  end
end
