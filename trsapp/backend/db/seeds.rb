# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# SecureRandomを使用するためのライブラリをインポート
require 'securerandom'

events = Event.all

collaborator = 
  {
    event_id: nil,
    user_id: "1d599123-4b0c-46b6-82fd-971e1985f8bf",
    role: "organizer",
    access_status: "active"
  }


events.each do |event|
  tar_account = collaborator.dup
  tar_account[:event_id] = event.id
  Collaborator.create!(tar_account)
  puts "コラボレータに追加　id:#{tar_account[:event_id]}"
end