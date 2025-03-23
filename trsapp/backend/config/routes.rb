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
      resources :profiles, param: :username do
        collection do
          get 'by_username/:username', to: 'profiles#show_by_username'
          
        end
      end
      resources :events, param: :token do
        resources :reservations, param: :token, shallow: true
        resources :collaborators, shallow: true
        resources :reservation_shares, param: :token, shallow: true do
          resource :details, param: :token, only: [:show, :update], controller: 'reservation_share_details', shallow: true
        end
      end
      get "invite/:detail_token", to: "reservation_share_details#show"
    end
  end
  
end
