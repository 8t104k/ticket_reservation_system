class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # 特定のユーザーとしてブロックを実行するヘルパーメソッド
  def self.as_user(user_id)
    previous_user_id = Thread.current[:current_user_id]
    Thread.current[:current_user_id] = user_id
    yield
  ensure
    Thread.current[:current_user_id] = previous_user_id
  end


end
