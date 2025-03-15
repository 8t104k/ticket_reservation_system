class Api::V1::CollaboratorsController < ApplicationController
  def index
    @event = Event.find_by!(token: params[:token])
    @collaborators = @event.collaborators.all
    render json: @collaborators
  end
  
end
