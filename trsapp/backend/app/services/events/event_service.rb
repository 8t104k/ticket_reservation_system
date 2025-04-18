module EventService
  # イベントを作成するサービスクラス
  class Create < ApplicationService
    def initialize(event_params, user)
      @event_params = event_params
      @user = user
    end

    def call
      Event.transaction do
        event = Event.create(@event_params)
        Collaborator.add(event,@user,role: :organizer, access_status: :active)
        event
      rescue => e
        Rails.logger.error("イベント作成エラー: #{e.message}")
      end
    end
  end

  class Update < ApplicationService
    def initialize(event,event_params,profile)
      @event = event
      @event_params = event_params
      @profile = profile
    end
    
    def call
      ContextService.with_auth_transaction(@profile.user_id) do
        @event.update(@event_params)
        @event
      rescue => e
        Rails.logger.error("イベント更新エラー: #{e.message}")
      end
    end
  end
  

  class Destroy < ApplicationService
    def initialize(event, profile)
      @event = event
      @profile = profile
    end
    
    def call
      @event.destroy
      ContextService.with_auth_transaction(@profile.user_id) do
        puts "削除開始"
      end
      puts "トランザクション終了"
    rescue => e
      puts "エラー発生: #{e.message}"
      false
    end
  end
end

