module Api
  module V1
    class Api::V1::EventsController < ApplicationController
      def index
        if @current_user.nil?
          # エラーを返す
        else
          @collaborator = Collaborator.find_by!(auth_connection_id: @current_user.id)
          @events = @collaborator.events
          render json: @events
        end
      end

      def show
        puts params[:token]
        @event = Event.find_by!(token: params[:token])
        render json: @event
      end
    end
  end
end