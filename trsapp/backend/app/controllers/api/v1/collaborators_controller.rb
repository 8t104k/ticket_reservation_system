class Api::V1::CollaboratorsController < ApplicationController
  before_action :set_event
  def index
    @collaborators = @event.collaborators.includes(:profile, :group)
    render json: @collaborators.as_json(include: [:profile, :group])
  end
  
  def show_current_clbr
    @current_collaborator = @event.collaborators.find_by(profile_id: @current_user.id)
    render json: @current_collaborator
  end
  
  def update_group
    @clbr = @event.collaborators.find_by(profile_id: @current_user.id)
    if @group = Group.find_by(token: params[:collaborator][:group_token])
      @clbr.group_id = @group.id
    else
      @clbr.group_id = nil
    end
    @clbr.save!
    render json: @group
  end

  private
  def set_event
    @event = Event.find_by!(token: params[:event_token])
  end

  def collaborator_params
    params.require(:collaborator).permit(:access_status,:group_token)
  end
end
