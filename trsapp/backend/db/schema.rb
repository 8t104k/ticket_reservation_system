# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_03_15_063013) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "auth_connections", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.datetime "last_verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_auth_connections_on_user_id", unique: true
  end

  create_table "collaborators", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.uuid "user_id", null: false
    t.string "role"
    t.string "access_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_collaborators_on_event_id"
    t.index ["user_id"], name: "index_collaborators_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "event_name"
    t.datetime "event_date"
    t.integer "status"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_events_on_token", unique: true
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.string "reservation_name"
    t.decimal "price"
    t.string "status"
    t.jsonb "customer_info"
    t.datetime "reserved_at"
    t.string "token"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_reservations_on_event_id"
  end

  add_foreign_key "collaborators", "auth_connections", column: "user_id", primary_key: "user_id"
  add_foreign_key "collaborators", "events"
  add_foreign_key "reservations", "events"
end
