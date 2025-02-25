module Api
  module V1
    class Api::V1::EventsController < ApplicationController
      def index
        events = Event.all
        render json: events
      end

      def show
        puts params[:token]
        @event = Event.find_by!(token: params[:token])
        
        render json: @event
      end
    end
  end

end