module EventService
  # イベントを作成するサービスクラス
  class Create < ApplicationService
  
    def initialize(event_params, user_id)
      @event_params = event_params
      @user_id = user_id
    end
  
    def call
      Event.transaction do
        event = Event.create_event(@event_params)
        AddCollaborator.call(event.id, @user_id, role: :organizer, access_status: :active)
        event
      end
    end
  end


end

