class UpdateExistingCollaboratorsWithPosition < ActiveRecord::Migration[7.1]
  def change
    Event.find_each do |event|
      event.collaborators.order(:created_at).each_with_index do |clb, index|
        clb.update_column(:position, index + 1)
      end
    end
  end

  def down 
    Collaborator.update_all(position: nil)
  end
end
