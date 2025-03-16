module Api
  module V1
    class EventsController < ApplicationController

      def index
        if @current_user.nil?
          render json: { error: "認証が必要です" }, status: :unauthorized
        else
          begin
            puts @current_user
            @events = @current_user.events
            render json: @events
          rescue => e
            Rails.logger.error("イベント取得エラー: #{e.message}")
            render json: { error: "イベント取得中にエラーが発生しました" }, status: :internal_server_error
          end
        end
      end

      def show
        puts params[:token]
        @event = Event.find_by!(token: params[:token])
        render json: @event
      end

      def create
        
      end

      def update
        
      end

      def destroy
        
      end
      def event_params
        params.require(:event).permit(:event_token, :event_name, :event_date)
      end
    end
  end
end