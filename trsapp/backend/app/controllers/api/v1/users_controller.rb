module Api
  module V1
    class UsersController < ApplicationController
      def show
        render json: @user
      end

      private
      
      def set_user
        @user = User.find(params[:username])
      end

      def user_params
        params.require(:user).permit(:username, :id, :email)
      end
    end
  end
end

