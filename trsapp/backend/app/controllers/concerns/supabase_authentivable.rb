module SupabaseAuthenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_jwt
  end

  def current_user
    @current_user ||= find_user
  end

  private

  def authenticate_jwt
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find_by(supabase_uid: @decoded[:sub])
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end