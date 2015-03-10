Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :shows, only: [:show] do
    resources :episodes, only: [:show]
  end
  resources :posts, only: [:create, :new, :show]
  resources :networks, only: [:show]
end
