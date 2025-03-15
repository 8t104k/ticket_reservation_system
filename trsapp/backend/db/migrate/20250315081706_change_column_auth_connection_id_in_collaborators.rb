class ChangeColumnAuthConnectionIdInCollaborators < ActiveRecord::Migration[7.1]
  def change
    remove_column :collaborators, :user_id, :uuid
    add_reference :collaborators, :auth_connection, foreign_key: true
  end
end
