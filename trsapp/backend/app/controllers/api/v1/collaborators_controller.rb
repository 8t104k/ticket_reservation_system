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

  private
  def set_event
    @event = Event.find_by!(token: params[:event_token])
  end
end
