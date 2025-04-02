class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update]
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
    # @event = Event.find_by!(token: params[:token])
    render json: @event
  end

  def create
    @event = Event.create_with_owner(event_params, @current_user)
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