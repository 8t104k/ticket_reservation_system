class Api::V1::CollaboratorsController < ApplicationController
  def index
    @event = Event.find_by!(token: params[:event_token])
    # @profiles = @event.profiles.all
    @collaborators = @event.collaborators.includes(:profile, :group)
    render json: @collaborators, include: %i[profile group]
  end
  
end
