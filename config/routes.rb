Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy, :show]
  resources :shows, only: [:show, :index, :create, :update] do
    resources :episodes, only: [:show, :create, :update]
  end
  resources :posts, only: [:create, :new, :show] do
    resources :comments, only: [:new, :create, :edit, :update]
  end
  resources :networks, only: :show
end
