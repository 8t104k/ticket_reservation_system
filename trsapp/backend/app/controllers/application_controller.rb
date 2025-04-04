class ApplicationController < ActionController::API
  before_action :authenticate_user
  attr_reader :current_user

  private

  def authenticate_user
    user_id = AuthService.verify_and_extract_user_id(request)
    @current_user = Profile.find_by!(user_id: user_id)
  rescue => e
    render json: { error: e.message }, status: :unauthorized
  end
end
