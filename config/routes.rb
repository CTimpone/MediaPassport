Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy, :show]
  resources :shows, only: [:show, :index, :create, :update] do
    resources :episodes, only: [:show, :create, :update] do
      get "verify"
    end
  end
  resources :posts, only: [:create, :new, :show] do
    member do
      post "endorse"
    end
    resources :comments, only: [:new, :create, :edit, :update] do
      member do
        post "endorse"
      end
    end
  end
  resources :networks, only: :show
  resources :ratings, only: [:create, :update]
  resources :watchlist_items, only: [:index, :create, :destroy]
end
