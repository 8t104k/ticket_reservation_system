class ModifyReservationsTable < ActiveRecord::Migration[7.1]
  def change
    add_reference :reservations, :collaborator, foreign_key: true
    add_column :reservations, :tmp_status, :integer
    remove_column :reservations, :token
    remove_column :reservations, :expires_at
    remove_column :reservations, :status
    rename_column :reservations, :tmp_status, :status
   end
end
