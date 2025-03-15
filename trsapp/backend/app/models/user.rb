# app/models/user.rb
class User < Flexirest::Base
  base_url SUPABASE_URL

  get :all, "/user"
  get :find, "/user/:username"
  put :save, "/user/:username"
  post :create, "/user"
  delete :remove, "/user/:username"
end