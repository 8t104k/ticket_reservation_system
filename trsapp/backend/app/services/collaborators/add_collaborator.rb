class AddCollaborator < ApplicationService
  class AddCollaboratorError < StandardError; end
  
  def initialize(event_id, user_id, role: :member, access_status: :pending)
    @event_id = event_id
    @user_id = user_id
    @role = role
    @access_status = access_status
  end
  
  def call
    event.collaborators.create!(
      profile_id: @user_id,
      role: ::Collaborator.roles[@role],
      access_status: ::Collaborator.access_statuses[@access_status]
      )
  rescue ActiveRecord::RecordInvalid => e
    raise AddCollaboratorError, "collaboratorの追加に失敗: #{e.message}"
  end

  private
  attr_reader :event_id

  def event
    @event ||= Event.find(event_id)
  rescue ActiveRecord::RecordNotFound
    raise AddCollaboratorError, "イベントが見つかりません (ID: #{event_id})"
  end
end
