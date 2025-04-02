class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update]

  def index
    render json: @current_user.events
  end

  def show
    render json: @event
  end

  def create
    @event = CreateEvent.call(event_params,@current_user.user_id)
    render json: @event
  rescue => e
    Rails.logger.error("イベント作成エラー: #{e.message}")
    render json: { error: "イベント作成中にエラーが発生しました" }, status: :internal_server_error
  end

  def edit
    @event = Event.find_by!(token: params[:token])
    render json: @event
  end

  def update
    Event.transaction do
      @event.update(event_params)
      render json: @event
    end
    rescue => e
      Rails.logger.error("イベント更新エラー: #{e.message}")
      render json: { error: "イベント更新中にエラーが発生しました" }, status: :internal_server_error
  end

  def destroy
    
  end

  private
  def event_params
    params.require(:event).permit(:event_name, :event_date, :status, :location)
  end
  def set_event
    @event = Event.find_by!(token: params[:token])
  end
end