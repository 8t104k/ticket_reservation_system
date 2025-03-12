# app/models/user.rb
class Profile < Flexirest::Base
  request_body_type :json
  base_url "#{ENV["SUPABASE_URL"]}/rest/v1"

  before_request do |name, request|
    request.headers["apikey"] = ENV["SUPABASE_SERVICE_ROLE_KEY"]
    request.headers["Authorization"] = "Bearer #{ENV["SUPABASE_SERVICE_ROLE_KEY"]}"
    request.headers["Accept-Encoding"] = "identity"
  end

  get :all, "rest/v1/profiles"
  get :find, "/profiles?id=eq.:id"
  get :find_by_username, "/profiles?username=eq.:username"
  put :save, "/profile/:username"
  post :create, "/profile"
  delete :remove, "/profile/:username"
end