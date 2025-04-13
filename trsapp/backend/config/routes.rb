Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  
  namespace :api do
    namespace :v1 do
      post "login", to: "auth#login"
      resources :profiles, param: :username, only: %i[show update destroy]
      resources :events, param: :token do
        resources :reservations, param: :token, shallow: true
        resources :collaborators
        get "current_clbr", to: "collaborators#show_current_clbr"
        patch "update_group", to: "collaborators#update_group"
        resource :reservation_share, param: :token
        get "group", to: "groups#show_setting_group"
      end
      resources :groups, param: :token
      get "invite/:token", to: "reservation_shares#invite"
    end
  end
  
end
