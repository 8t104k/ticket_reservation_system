class ApplicationController < ActionController::API
  #before_action :authenticate_supabase_token
  attr_reader :current_user

  private

  def authenticate_supabase_token
    header = request.headers['Authorization'].split(' ').last
    # header = header.split(' ').last if header
    begin
      # Supabase JWTを検証
      decoded = JsonWebToken.decode(header)
      @current_user = User.find_by(supabase_uid: decoded[:sub])
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
