Rails.application.routes.draw do
  root 'sessions#new'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :shows, only: [:show, :index, :create] do
    resources :episodes, only: [:show]
  end
  resources :posts, only: [:create, :new, :show]
  resources :comments, only: [:new, :create, :edit, :update]
  resources :networks, only: :show
end
