class Api::V1::ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :update]
  def show
    unless @profile
      return render json: { error: "ユーザーが見つかりません" }, status: :not_found
    end
    render json: @profile.as_details_json
  end

  def update
    Profile.transaction do
      @profile.update(profile_params)
      render json: @profile.as_details_json
    end
  end
  

  private
  def set_profile
    with_auth_context(@current_user.user_id) do
      @profile = Profile.find_by(username: params[:username])
    end
  end

  def profile_params
    params.require(:profile).permit(:email, :display_name, :avatar_url)
  end
end
