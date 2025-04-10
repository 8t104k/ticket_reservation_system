class Api::V1::GroupsController < ApplicationController
  def index
    render json: @current_user.groups.all
  end

  def create
    Group.transaction do
      @group = Group.new(group_params)
      @group.owner_id = @current_user.id
      @group.save!
      @current_user.groups << @group
    end
    render json: @group
  rescue => e
    render json: "グループの作成に失敗：#{e.message}"
  end

  def update
    @group = Group.find_by(token: params[:token])
    @group.update_all(group_params)
    render json: @group
  end

  def destroy

  end

  private
  def group_params
    params.require(:group).permit(:group_name,:img_url)
  end
end
