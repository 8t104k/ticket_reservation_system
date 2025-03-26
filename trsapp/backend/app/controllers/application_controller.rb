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
      @current_user = Profile.find_by(user_id: payload['sub'])
    end
  rescue JWT::DecodeError, StandardError => e
    render json: { error: e.message }, status: :unauthorized
  end
end
