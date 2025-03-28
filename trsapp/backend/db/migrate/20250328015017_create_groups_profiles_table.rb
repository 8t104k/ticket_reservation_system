class CreateGroupsProfilesTable < ActiveRecord::Migration[7.1]
  def change
    create_table :groups_profiles do |t|
      t.references :group, foreign_key: true, null: false
      t.references :profile, foreign_key: true, null: false
      
      t.timestamps
    end
    add_index :groups_profiles, [:group_id, :profile_id], unique: true
  end
end
