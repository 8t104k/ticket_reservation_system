class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups do |t|
      t.string :group_name, null: false
      t.references :owner, foreign_key: { to_table: :profiles }
      t.string :token
      t.string :img_name
      t.uuid :img_object_id

      t.timestamps
    end

    add_index :groups, :group_name
    add_index :groups, :token, unique: true
  end
end
