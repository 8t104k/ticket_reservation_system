module SupabaseAuthenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
  end

  def current_user
    @current_user ||= find_user
  end

  private

  def authenticate_user!
    render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def find_user
    token = extract_token_from_header
    return nil unless token

    payload = Supabase::Auth.verify_jwt(token)
    return nil unless payload

    user_id = payload.first['sub']
    User.find_by(supabase_id: user_id)
  end

  def extract_token_from_header
    request.headers['Authorization']&.split(' ')&.last
  end
end