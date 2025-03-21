module Api
  module V1
    class Api::V1::ReservationsController < ApplicationController
      before_action :set_event
      def create
        Reservation.transaction do
          # 予約の作成
          @reservation = @event.reservations.new(reservation_params)
          @reservation.reserved_at = Time.now
          puts "collaborators hit : #{@event.collaborators.find_by(profile_id: @current_user.id).id}"
          @reservation.collaborator_id = @event.collaborators.find_by(profile_id: @current_user.id).id
          @reservation.reserved!
          @reservation.save!
          render json: @reservation
        rescue => e
            Rails.logger.error("予約作成エラー: #{e.message}")
            render json: { error: "予約作成中にエラーが発生しました" }, status: :internal_server_error
        end
      end

      def index
        puts "reservation: #{params[:event_token]}"
        @reservations = @event.reservations.all
        render json: @reservations
      end
      def show

      end

      private
      def reservation_params
        params.require(:reservation).permit(:reservation_name, :price, :status)
      end
      def set_event
        @event = Event.find_by!(token: params[:event_token])
      end

    end
  end
end
