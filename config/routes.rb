Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy, :show]
  resources :shows, only: [:show, :index, :create, :update] do
    member do
      post "watchlist_toggle"
    end
    collection do
      post "batch_create"
    end
    resources :episodes, only: [:show, :create, :update] do
      member do
        get "verify"
      end
      collection do
        post "batch_create"
      end
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
  resources :search, only: :index
  resources :ratings, only: [:create, :update]
  resources :watchlist_items, only: :index
  post "episodes/batch_verify", to: "episodes#batch_verify"
end
