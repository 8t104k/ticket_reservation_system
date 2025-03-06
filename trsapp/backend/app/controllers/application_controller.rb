class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  private

  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      @decoded = JsonWebToken.decode(header)
      puts @decoded[:username]
      @current_user = User.find_by!(username: @decoded[:username])
    rescue ActiveRecord::RecordNotFound => e
      render json: {errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: {errors: e.message }, status: :unauthorized
    end
  end
end
