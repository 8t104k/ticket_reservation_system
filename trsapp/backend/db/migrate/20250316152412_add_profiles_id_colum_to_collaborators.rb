class AddProfilesIdColumToCollaborators < ActiveRecord::Migration[7.1]
  def change
    add_reference :collaborators, :profile, foreign_key: true
  end
end
