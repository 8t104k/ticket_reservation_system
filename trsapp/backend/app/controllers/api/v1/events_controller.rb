class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]

  def index
    render json: @current_user.events
  end

  def show
    render json: @event
  end

  def create
    @event = EventService::Create.call(event_params,@current_user)
    render json: @event
  rescue => e
    render json: { error: "イベント作成中にエラーが発生しました：#{e.message}" }, status: :internal_server_error
  end

  def edit
    @event = Event.find_by(token: params[:token])
    render json: @event
  end

  def update
    EventService::Update.call(@event,event_params,@current_user)
    render json: @event
  rescue => e
      render json: { error: "イベント更新中にエラーが発生しました：#{e.message}" }, status: :internal_server_error
  end

  def destroy
    EventService::Destroy.call(@event,@current_user)
    puts "削除処理終了"
    render json: { success: "イベントの削除が完了しました" }, status: :success
  rescue => e
      render json: { error: "イベント削除中にエラーが発生しました：#{e.message}" }, status: :internal_server_error
  end

  private
  def event_params
    params.require(:event).permit(:event_name, :event_date, :status, :location)
  end
  def set_event
    @event = Event.find_by(token: params[:token])
    unless @event
      render json: { error: "イベントがありません" }
    end
  end
end