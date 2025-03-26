class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  after_initialize do
    self.class.connection.execute("RESET ROLE;")
    self.class.connection.execute("RESET request.jwt.claims;")

    user_id = Thread.current[:current_user_id]
    if user_id
      # 認証済みユーザーとしてクエリを実行
      self.class.connection.execute("SET ROLE authenticated;")
      # JWTクレームをセット
      claims = { sub: user_id }.to_json
      self.class.connection.execute("SET request.jwt.claims TO '#{claims}';")
    else
      # 匿名ユーザーとしてクエリを実行
      self.class.connection.execute("SET ROLE anon;")
    end
  end

  # 特定のユーザーとしてブロックを実行するヘルパーメソッド
  def self.as_user(user_id)
    previous_user_id = Thread.current[:current_user_id]
    Thread.current[:current_user_id] = user_id
    yield
  ensure
    Thread.current[:current_user_id] = previous_user_id
  end
end
