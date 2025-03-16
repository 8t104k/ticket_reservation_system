class DeleteColumnAuthConnectionIdFromCollaborators < ActiveRecord::Migration[7.1]
  def change
    remove_column :collaborators, :auth_connection_id
  end
end
