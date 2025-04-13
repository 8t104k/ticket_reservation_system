class Api::V1::GroupsController < ApplicationController
  before_action :set_group

  def index
    render json: @current_user.groups.as_json
  end

  def show
    render json: @group
  end

  def show_setting_group
    @event = Event.includes(collaborators: :group).find_by!(token: params[:event_token])
    @clb = @event.collaborators.find_by!(profile_id: @current_user.id)
    @group = @clb.group
    render json: @group
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
    @group.update(group_params)
    render json: @group
  end

  def destroy
    @group.destroy
    render json: {success: "グループの削除に成功しました"}
  end

  private
  def group_params
    params.require(:group).permit(:group_name,:img_url,:description)
  end

  def set_group
    @group = Group.find_by(token: params[:token])
  end
end
