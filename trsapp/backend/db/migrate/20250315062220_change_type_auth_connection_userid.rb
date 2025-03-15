class ChangeTypeAuthConnectionUserid < ActiveRecord::Migration[7.1]
  def up 
    execute <<-SQL
      ALTER TABLE auth_connections
      ALTER COLUMN user_id TYPE uuid
      USING user_id::uuid
    SQL
  end
  def down 
    drop_table :auth_connections, :user_id, :string
  end
end
