class Api::V1::CollaboratorsController < ApplicationController
  def index
    @event = Event.find_by!(token: params[:event_token])
    @profiles = @event.profiles.all
    render json: @profiles
  end
  
end
