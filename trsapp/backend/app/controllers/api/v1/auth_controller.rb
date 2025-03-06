class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:login]

  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(username: @user.username)
      render json: {
        success: true,
        token: token,
        user: { username: @user.username }
      }, status: :ok
    else
      render json: {
        success: false, error: 'ログインに失敗しました'
      },status: :unauthorized
    end
  end

  def user_profile
    render json: current_user, status: :ok
  end
end