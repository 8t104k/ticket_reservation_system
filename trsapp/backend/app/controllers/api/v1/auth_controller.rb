class Api::V1::AuthController < ApplicationController

  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      render json: {
        success: true,
        user: { id: @user.id, username: @user.username }
      }, status: :ok
    else
      render json:{
        success: false, error: 'ログインに失敗しました'
      },status: :unauthorized
    end
  end


end