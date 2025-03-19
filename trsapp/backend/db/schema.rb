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

ActiveRecord::Schema[7.1].define(version: 2025_03_19_122211) do
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
    t.index ["event_id"], name: "index_collaborators_on_event_id"
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

  add_foreign_key "collaborators", "events"
  add_foreign_key "collaborators", "profiles"
  add_foreign_key "profiles", "auth.users", name: "profiles_user_id_fkey", on_update: :cascade, on_delete: :cascade
  add_foreign_key "profiles_v1", "auth.users", column: "id", name: "profiels_id_fkey", on_update: :cascade, on_delete: :nullify
  add_foreign_key "reservations", "events"
end
