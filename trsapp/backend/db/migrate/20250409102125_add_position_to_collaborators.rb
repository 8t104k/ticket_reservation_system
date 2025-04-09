class AddPositionToCollaborators < ActiveRecord::Migration[7.1]
  def change
    add_column :collaborators, :position, :integer
    add_index :collaborators, [:event_id, :position], unique: true
  end
end
