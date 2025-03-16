class Api::V1::EventsController < ApplicationController
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
    Event.transaction do
      # イベントの作成
      @event = Event.new(event_params)
      @event.draft!
      @event.save!
      # コラボレーターも作成
      @collaborators = @event.collaborators.build({
        role: "organizer",
        access_status: "active",
        profile_id: @current_user.user_id
      })
      @collaborators.save!
    end
    render json: @event
  rescue => e
      Rails.logger.error("イベント作成エラー: #{e.message}")
      render json: { error: "イベント作成中にエラーが発生しました" }, status: :internal_server_error
  end

  def update
    
  end

  def destroy
    
  end

  def event_params
    params.require(:event).permit(:event_name, :event_date)
  end
end