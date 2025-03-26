# リクエストごとに、どのユーザーからなのかを設定する
class SupabaseUserContext
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    header = request.env['HTTP_AUTHORIZATION']&.split(' ')&.last
    if header
      decoded = JWT.decode(header,ENV['SUPABASE_JWT_SECRET'],true)
      payload = decoded[0]
      Thread.current[:current_user_id] = payload['sub'] # ユーザーID
      puts "middleware実行"
    end
    @app.call(env)
  ensure
    Thread.current[:current_user_id] = nil
  end
end