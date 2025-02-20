# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

events = [
  {
    event_name: "Ruby開発者会議2025",
    event_date: DateTime.new(2025, 3, 15, 13, 0), # 2025年3月15日 13:00
    status: 0  # 準備中
  },
  {
    event_name: "Railsワークショップ",
    event_date: DateTime.new(2025, 4, 20, 10, 30), # 2025年4月20日 10:30
    status: 1  # 開催中
  },
  {
    event_name: "プログラミング初心者向けセミナー",
    event_date: DateTime.new(2025, 5, 1, 15, 0), # 2025年5月1日 15:00
    status: 2  # 終了
  },
  {
    event_name: "テックカンファレンス2025",
    event_date: DateTime.new(2025, 6, 10, 9, 0), # 2025年6月10日 9:00
    status: 0  # 準備中
  },
  {
    event_name: "アジャイル開発実践講座",
    event_date: DateTime.new(2025, 7, 5, 14, 0), # 2025年7月5日 14:00
    status: 1  # 開催中
  }
]

events.each do |event|
  Event.create!(event)
end