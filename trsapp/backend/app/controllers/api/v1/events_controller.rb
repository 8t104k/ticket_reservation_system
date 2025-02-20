
module Api
  module V1
    class Api::V1::EventsController < ApplicationController
      def index
        events = Event.all
        render json: events
      end
    end
  end

end