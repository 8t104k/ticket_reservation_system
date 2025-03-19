class ApplicationController < ActionController::API
  before_action :authenticate_supabase_token
  attr_reader :current_connection, :current_user

  private

  def authenticate_supabase_token
    
    header = request.headers['Authorization']&.split(' ')&.last
    raise StandardError, '認証ヘッダーがありません' if header.nil?

    #retries = 0
    #max_retries = 3

    begin
      # Supabase JWTを検証
      decoded = JWT.decode(
        header,
        ENV["SUPABASE_JWT_SECRET"],
        true
      )
      payload = decoded[0]
      @current_connection = AuthConnection&.find_by(user_id: payload["sub"])
      @current_user = Profile.find_by(user_id: payload["sub"])

#      if @current_user.nil? && retries < max_retries
#        retries += 1
#        sleep(0.5 * retries)
#        retry
#      end

      if @current_connection.nil?
        @current_connection = AuthConnection.new(user_id: payload["sub"], last_verified_at: Time.current)
        @current_connection.save
      end
    end
    
  rescue JWT::DecodeError, StandardError => e
    render json: { error: e.message }, status: :unauthorized
  end
end
