class ChangeColumnNameImgObjectIdInGroups < ActiveRecord::Migration[7.1]
  def change
    rename_column :groups, :img_object_id, :img_url
  end
end
