# イベントを作成するサービスクラス
class CreateEvent < ApplicationService

  def initialize(event_params, user_id)
    @event_params = event_params
    @user_id = user_id
  end

  def call
    Event.transaction do
      event = Event.new(@event_params)
      event.draft!
      event.save!
      AddCollaborator.call(event.id, @user_id, role: :organizer, access_status: :active)
      event
    end
  end
end