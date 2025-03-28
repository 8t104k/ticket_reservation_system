class AddGroupIdToCollaborators < ActiveRecord::Migration[7.1]
  def change
    add_reference :collaborators, :group, foreign_key: true
  end
end
