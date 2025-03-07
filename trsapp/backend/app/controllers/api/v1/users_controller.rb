class Api::V1::UsersController < ApplicationController
  include JwtAuthenticable
  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
        success: true,
        notice: '登録完了！',
        user: @user.as_json(except: [:password_digest])
      }, status: :created
    else
      render json: {
        success: false,
        notice: '登録に失敗しました'
      }, status: :unprocessable_entity
    end
  end
  def show
    @user = User.find_by!(username: params[:username])
    render json: @user.as_json(except: [:password_digest])
  end
  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
