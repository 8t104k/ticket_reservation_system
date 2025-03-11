# app/models/user.rb
class Profile < Flexirest::Base
  request_body_type :json
  perform_caching false
  base_url ENV["SUPABASE_URL"]

  before_request do |name, request|
    request.headers["apikey"] = ENV["SUPABASE_SERVICE_ROLE_KEY"]
    request.headers["Authorization"] = "Bearer #{ENV["SUPABASE_SERVICE_ROLE_KEY"]}"
    request.headers["Accept-Encoding"] = "identity"
  end

  get :all, "rest/v1/profiles"
  get :find, "/profile/:username"
  get :find_by_username, "/rest/v1/profiles?username=eq.:username"
  put :save, "/profile/:username"
  post :create, "/profile"
  delete :remove, "/profile/:username"
end