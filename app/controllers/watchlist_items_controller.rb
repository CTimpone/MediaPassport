class WatchlistItemsController < ApplicationController
  def index
    @items = current_user.watchlist_items if current_user
    render "index.json.jbuilder"
  end
end
