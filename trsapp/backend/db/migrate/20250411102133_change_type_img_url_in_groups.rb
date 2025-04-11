class ChangeTypeImgUrlInGroups < ActiveRecord::Migration[7.1]
  def change
    change_column :groups, :img_url, :text
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
