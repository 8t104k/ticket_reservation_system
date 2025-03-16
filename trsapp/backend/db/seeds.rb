# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
events = Event.all

collaborator = 
  {
    event_id: nil,
    role: "organizer",
    access_status: "active",
    auth_connection_id: 1,
    profile_id: 1
  }

events.each do |event|
  tar_account = collaborator.dup
  tar_account[:event_id] = event.id
  Collaborator.create!(tar_account)
  puts "コラボレータに追加 id:#{tar_account[:event_id]}"
end
