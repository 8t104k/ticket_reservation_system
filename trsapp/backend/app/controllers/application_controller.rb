class ApplicationController < ActionController::API
  before_action :authenticate_supabase_token
  attr_reader :current_connection, :current_user

  private
  def authenticate_supabase_token
    header = request.headers['Authorization']&.split(' ')&.last
    raise StandardError, '認証ヘッダーがありません' if header.nil?

    begin
      # Supabase JWTを検証
      decoded = JWT.decode(header,ENV['SUPABASE_JWT_SECRET'],true)
      payload = decoded[0]
      Profile.transaction do
        @current_user = Profile.find_by(user_id: payload['sub'])
      end
    end
  rescue JWT::DecodeError, StandardError => e
    render json: { error: e.message }, status: :unauthorized
  end

  def with_auth_context(user_id = nil)
    ActiveRecord::Base.transaction do
      conn = ActiveRecord::Base.connection
      conn.execute("SET LOCAL role = 'authenticated'")
      
      if user_id.present?
        claims = { sub: user_id }.to_json
        conn.execute("SET LOCAL request.jwt.claims TO '#{claims}';")
      end
      
      yield
    end
  end

end
