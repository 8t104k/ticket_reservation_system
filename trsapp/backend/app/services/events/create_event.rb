# イベントを作成するサービスクラス
class CreateEvent < ApplicationService

  def initialize(event_params, user)
    @event_params = event_params
    @user = user
  end

  def call(event_params)
    event = Event.new(event_params)
    event.draft!
    event.save!
    event
  end
end