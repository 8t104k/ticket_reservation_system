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

ActiveRecord::Schema[7.1].define(version: 2025_03_28_102112) do
  create_schema "auth"
  create_schema "extensions"
  create_schema "graphql"
  create_schema "graphql_public"
  create_schema "net"
  create_schema "pgbouncer"
  create_schema "pgsodium"
  create_schema "pgsodium_masks"
  create_schema "realtime"
  create_schema "storage"
  create_schema "supabase_functions"
  create_schema "vault"

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_graphql"
  enable_extension "pg_net"
  enable_extension "pg_stat_statements"
  enable_extension "pgcrypto"
  enable_extension "pgjwt"
  enable_extension "pgsodium"
  enable_extension "plpgsql"
  enable_extension "supabase_vault"
  enable_extension "uuid-ossp"

  create_table "auth_connections", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.datetime "last_verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_auth_connections_on_user_id", unique: true
  end

  create_table "collaborators", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.string "role"
    t.string "access_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "profile_id"
    t.bigint "group_id"
    t.index ["event_id"], name: "index_collaborators_on_event_id"
    t.index ["group_id"], name: "index_collaborators_on_group_id"
    t.index ["profile_id"], name: "index_collaborators_on_profile_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "event_name"
    t.date "event_date"
    t.integer "status"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_events_on_token", unique: true
  end

  create_table "groups", force: :cascade do |t|
    t.string "group_name", null: false
    t.bigint "owner_id"
    t.string "token"
    t.string "img_name"
    t.uuid "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_name"], name: "index_groups_on_group_name"
    t.index ["owner_id"], name: "index_groups_on_owner_id"
    t.index ["token"], name: "index_groups_on_token", unique: true
  end

  create_table "groups_profiles", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "profile_id"], name: "index_groups_profiles_on_group_id_and_profile_id", unique: true
    t.index ["group_id"], name: "index_groups_profiles_on_group_id"
    t.index ["profile_id"], name: "index_groups_profiles_on_profile_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.uuid "user_id"
    t.string "username"
    t.string "email"
    t.string "display_name"
    t.text "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "profiles_v1", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "username"
    t.string "email", null: false
    t.text "avatar_url"
    t.datetime "update_at", precision: nil, default: -> { "now()" }, null: false
    t.timestamptz "created_at", default: -> { "now()" }, null: false
    t.text "display_name"

    t.unique_constraint ["email"], name: "users_email_key"
    t.unique_constraint ["username"], name: "users_username_key"
  end

  create_table "reservation_share_details", force: :cascade do |t|
    t.bigint "reservation_share_id", null: false
    t.string "token"
    t.jsonb "font_info", default: {"size"=>"16px", "family"=>"Roboto", "weight"=>400}
    t.jsonb "color_info", default: {"text"=>"#303030", "primary"=>"#FF9800", "secondary"=>"#FFCC80", "background"=>"#F5F5F5"}
    t.string "background_img"
    t.jsonb "extracted_colors"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_share_id"], name: "index_reservation_share_details_on_reservation_share_id"
    t.index ["token"], name: "index_reservation_share_details_on_token", unique: true
  end

  create_table "reservation_shares", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "collaborator_id", null: false
    t.string "token"
    t.datetime "expires_at"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["collaborator_id"], name: "index_reservation_shares_on_collaborator_id"
    t.index ["event_id"], name: "index_reservation_shares_on_event_id"
    t.index ["token"], name: "index_reservation_shares_on_token", unique: true
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.string "reservation_name"
    t.decimal "price"
    t.jsonb "customer_info"
    t.datetime "reserved_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "collaborator_id"
    t.integer "status"
    t.index ["collaborator_id"], name: "index_reservations_on_collaborator_id"
    t.index ["event_id"], name: "index_reservations_on_event_id"
  end

  add_foreign_key "collaborators", "events"
  add_foreign_key "collaborators", "groups"
  add_foreign_key "collaborators", "profiles"
  add_foreign_key "groups", "profiles", column: "owner_id"
  add_foreign_key "groups_profiles", "groups"
  add_foreign_key "groups_profiles", "profiles"
  add_foreign_key "profiles", "auth.users", name: "profiles_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "reservation_share_details", "reservation_shares"
  add_foreign_key "reservation_shares", "collaborators"
  add_foreign_key "reservation_shares", "events"
  add_foreign_key "reservations", "collaborators"
  add_foreign_key "reservations", "events"
end
