class Api::V1::CollaboratorsController < ApplicationController
  def index
    @event = Event.find_by!(token: params[:event_token])
    # @profiles = @event.profiles.all
    @collaborators = @event.collaborators.includes(:profile, :group)
    @current_collaborator = @collaborators.find_by(profile_id: @current_user.id)
    response_data = {
      collaborators: @collaborators.as_json(include: [:profile, :group]),
      current_collaborator: @current_collaborator.as_json
    }
    render json: response_data
  end
  
end
