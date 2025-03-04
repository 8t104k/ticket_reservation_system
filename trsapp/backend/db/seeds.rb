# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# SecureRandomを使用するためのライブラリをインポート
require 'securerandom'

# イベントデータを作成
events = [
  {
    event_name: "BACK HORN 20周年アニバーサリーライブ",
    event_date: DateTime.new(2025, 3, 15, 18, 0), # 2025年3月15日 18:00
    status: 0,  # 準備中
    token: SecureRandom.hex(10)
  },
  {
    event_name: "YOASOBI 2025春ツアー",
    event_date: DateTime.new(2025, 4, 20, 17, 30), # 2025年4月20日 17:30
    status: 1,  # 開催中
    token: SecureRandom.hex(10)
  },
  {
    event_name: "星野源 POP VIRUS",
    event_date: DateTime.new(2025, 5, 1, 19, 0), # 2025年5月1日 19:00
    status: 2,  # 終了
    token: SecureRandom.hex(10)
  },
  {
    event_name: "サマーソニック2025",
    event_date: DateTime.new(2025, 8, 16, 10, 0), # 2025年8月16日 10:00
    status: 0,  # 準備中
    token: SecureRandom.hex(10)
  },
  {
    event_name: "あいみょん 全国ホールツアー",
    event_date: DateTime.new(2025, 6, 5, 18, 30), # 2025年6月5日 18:30
    status: 1,  # 開催中
    token: SecureRandom.hex(10)
  },
  {
    event_name: "King Gnu アリーナライブ",
    event_date: DateTime.new(2025, 7, 12, 17, 0), # 2025年7月12日 17:00
    status: 0,  # 準備中
    token: SecureRandom.hex(10)
  }
]

# ステータスの意味をコメントで記載
# Event status: 0 = 準備中, 1 = 開催中, 2 = 終了

# イベントを作成し、作成したイベントの配列を保持
created_events = []
events.each do |event|
  created_events << Event.create!(event)
end

# 予約データのステータス
# "pending" = 予約中, "confirmed" = 確定済み, "cancelled" = キャンセル, "completed" = 完了（入場済み）

# 座席タイプとそれぞれの価格
seat_types = {
  "SS席": 15000.00,
  "S席": 12000.00,
  "A席": 9000.00,
  "B席": 7000.00, 
  "立見": 5000.00,
  "VIP": 25000.00,
  "ペアシート": 20000.00
}

# 予約データを作成
reservations = [
  # BACK HORN 20周年アニバーサリーライブの予約
  {
    event_id: created_events[0].id,
    reservation_name: "山田太郎",
    price: seat_types[:"SS席"],
    status: "confirmed",
    customer_info: {
      email: "yamada.taro@example.com",
      phone: "090-1234-5678",
      seat_type: "SS席",
      seat_number: "A-12",
      payment_method: "クレジットカード"
    },
    reserved_at: DateTime.new(2025, 2, 15, 10, 0),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 3, 14, 23, 59)
  },
  {
    event_id: created_events[0].id,
    reservation_name: "佐藤花子",
    price: seat_types[:"A席"],
    status: "pending",
    customer_info: {
      email: "sato.hanako@example.com",
      phone: "080-8765-4321",
      seat_type: "A席",
      seat_number: "C-34",
      payment_method: "銀行振込"
    },
    reserved_at: DateTime.new(2025, 2, 20, 15, 30),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 3, 1, 23, 59)
  },
  
  # YOASOBI 2025春ツアーの予約
  {
    event_id: created_events[1].id,
    reservation_name: "鈴木一郎",
    price: seat_types[:"S席"],
    status: "confirmed",
    customer_info: {
      email: "suzuki.ichiro@example.com",
      phone: "070-2345-6789",
      seat_type: "S席",
      seat_number: "B-22",
      payment_method: "コンビニ決済",
      fan_club_member: true
    },
    reserved_at: DateTime.new(2025, 3, 10, 9, 15),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 4, 19, 23, 59)
  },
  {
    event_id: created_events[1].id,
    reservation_name: "高橋直子",
    price: seat_types[:"立見"],
    status: "cancelled",
    customer_info: {
      email: "takahashi.naoko@example.com",
      phone: "080-3456-7890",
      seat_type: "立見",
      payment_method: "電子マネー",
      cancellation_reason: "都合により参加不可"
    },
    reserved_at: DateTime.new(2025, 3, 15, 14, 0),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 4, 19, 23, 59)
  },
  
  # 星野源 POP VIRUSの予約
  {
    event_id: created_events[2].id,
    reservation_name: "田中健太",
    price: seat_types[:"SS席"],
    status: "completed",
    customer_info: {
      email: "tanaka.kenta@example.com",
      phone: "090-4567-8901",
      seat_type: "SS席",
      seat_number: "A-5",
      payment_method: "クレジットカード",
      merchandise_pre_order: "Tシャツ(L)、タオル"
    },
    reserved_at: DateTime.new(2025, 4, 1, 18, 30),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 4, 30, 23, 59)
  },
  {
    event_id: created_events[2].id,
    reservation_name: "伊藤美咲",
    price: seat_types[:"B席"],
    status: "completed",
    customer_info: {
      email: "ito.misaki@example.com",
      phone: "070-5678-9012",
      seat_type: "B席",
      seat_number: "D-45",
      payment_method: "電子マネー",
      entrance_time: "18:30"
    },
    reserved_at: DateTime.new(2025, 4, 5, 11, 45),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 4, 30, 23, 59)
  },
  
  # サマーソニック2025の予約
  {
    event_id: created_events[3].id,
    reservation_name: "渡辺秀樹",
    price: 25000.00, # 3日通し券
    status: "confirmed",
    customer_info: {
      email: "watanabe.hideki@example.com",
      phone: "080-6789-0123",
      ticket_type: "3日通し券",
      payment_method: "クレジットカード",
      special_request: "ベジタリアンフード対応希望"
    },
    reserved_at: DateTime.new(2025, 5, 10, 9, 30),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 8, 15, 23, 59)
  },
  {
    event_id: created_events[3].id,
    reservation_name: "小林誠",
    price: 12000.00, # 1日券
    status: "confirmed",
    customer_info: {
      email: "kobayashi.makoto@example.com",
      phone: "090-7890-1234",
      ticket_type: "1日券(8/16)",
      payment_method: "銀行振込",
      has_paid: true
    },
    reserved_at: DateTime.new(2025, 6, 10, 16, 20),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 8, 15, 23, 59)
  },
  
  # あいみょん 全国ホールツアーの予約
  {
    event_id: created_events[4].id,
    reservation_name: "中村京子",
    price: seat_types[:"VIP"],
    status: "confirmed",
    customer_info: {
      email: "nakamura.kyoko@example.com",
      phone: "070-8901-2345",
      seat_type: "VIP",
      seat_number: "特別エリアA-3",
      payment_method: "クレジットカード",
      fan_club_member: true,
      special_benefits: "ミート&グリート付き"
    },
    reserved_at: DateTime.new(2025, 5, 15, 13, 10),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 6, 4, 23, 59)
  },
  {
    event_id: created_events[4].id,
    reservation_name: "斉藤雄一",
    price: seat_types[:"A席"],
    status: "pending",
    customer_info: {
      email: "saito.yuichi@example.com",
      phone: "080-9012-3456",
      seat_type: "A席",
      seat_number: "C-18",
      payment_method: "コンビニ決済",
      payment_deadline: "2025-05-30"
    },
    reserved_at: DateTime.new(2025, 5, 20, 10, 45),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 5, 30, 23, 59)
  },
  
  # King Gnu アリーナライブの予約
  {
    event_id: created_events[5].id,
    reservation_name: "加藤由美",
    price: seat_types[:"ペアシート"],
    status: "confirmed",
    customer_info: {
      email: "kato.yumi@example.com",
      phone: "090-0123-4567",
      seat_type: "ペアシート",
      seat_number: "特別エリアP-5",
      payment_method: "クレジットカード",
      companion_name: "加藤健太",
      special_request: "車椅子スペース近くを希望"
    },
    reserved_at: DateTime.new(2025, 4, 25, 12, 15),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 7, 11, 23, 59)
  },
  {
    event_id: created_events[5].id,
    reservation_name: "木村拓哉",
    price: seat_types[:"SS席"],
    status: "confirmed",
    customer_info: {
      email: "kimura.takuya@example.com",
      phone: "080-1234-5678",
      seat_type: "SS席",
      seat_number: "A-1",
      payment_method: "銀行振込",
      fan_club_member: true,
      merchandise_pre_order: "パーカー(M)、キーホルダー"
    },
    reserved_at: DateTime.new(2025, 4, 30, 9, 0),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 7, 11, 23, 59)
  },
  {
    event_id: created_events[5].id,
    reservation_name: "松本花子",
    price: seat_types[:"B席"],
    status: "pending",
    customer_info: {
      email: "matsumoto.hanako@example.com",
      phone: "070-2345-6789",
      seat_type: "B席",
      seat_number: "D-30",
      payment_method: "コンビニ決済",
      payment_deadline: "2025-05-15",
      is_student: true
    },
    reserved_at: DateTime.new(2025, 5, 5, 15, 30),
    token: SecureRandom.hex(8),
    expires_at: DateTime.new(2025, 5, 15, 23, 59)
  }
]

# 予約データを作成
reservations.each do |reservation|
  Reservation.create!(reservation)
end

puts "ライブイベントとチケット予約のシードデータを作成しました！"
puts "作成したデータ: イベント #{Event.count}件、予約 #{Reservation.count}件"