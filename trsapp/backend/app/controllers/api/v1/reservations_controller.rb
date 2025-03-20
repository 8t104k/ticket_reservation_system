module Api
  module V1
    class Api::V1::ReservationsController < ApplicationController
      def new
        
      end
      def index
        puts "reservation: #{params[:event_token]}"
        @event = Event.find_by!(token: params[:event_token])
        @reservation = @event.reservations.build(event_id: @event.id)
        @reservation.customer_info = {} if @reservation.customer_info.nil?
        @reservations = @event.reservations.all
        render json: @reservations
      end
      def show

      end
    end
  end
end
