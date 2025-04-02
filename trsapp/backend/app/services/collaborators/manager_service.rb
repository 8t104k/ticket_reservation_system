module Collaborator
  class ManagerService
    class ManagerError < StandardError; end

    def initialize(event)
      @event = event
    end

    def add_organizer(user)
      @event.collaborators.create!(
        profile_id: user.user_id,
        role: ::Collaborator.roles[:organizer],
        access_status: ::Collaborator.access_status[:active]
      )
    rescue ManagerError => e
      raise "organizerの追加に失敗：#{e.message}"
    end
  end
end