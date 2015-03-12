Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy, :show]
  resources :shows, only: [:show, :index, :create] do
    resources :episodes, only: [:show, :create]
  end
  resources :posts, only: [:create, :new, :show]
  resources :comments, only: [:new, :create, :edit, :update]
  resources :networks, only: :show
end
