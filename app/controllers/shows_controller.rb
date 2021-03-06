class ShowsController < ApplicationController
  before_action :ensure_signed_in, only: [:watchlist_toggle]

  def show
    @show = Show.includes(:episodes).find_by(title: escape_ampersands(params[:id]))
    if !current_user
      @endorsed = false
    else
      @endorsed = !!current_user.watchlist_items.find_by(show_id: @show.id)
    end
    render "show.json.jbuilder"
  end

  def index
    @shows = Show.all
    render json: @shows
  end

  def update
    @show = Show.find_by(title: escape_ampersands(params[:id]))
    if @show.update_attributes(show_params)
      render json: @show
    else
      render json: {errors: @show.errors.full_messages}
    end
  end

  def create
    @show = Show.new(show_params)
    if @show.save
      render json: @show
    else
      render json: {errors: @show.errors.full_messages}
    end
  end

  def batch_create
    data = params["shows"]
    arr = []
    data.each do |key, show|
      show.delete('year')
      arr.push(show)
    end
    Show.create(arr)
    render json: arr
  end

  def watchlist_toggle
    show = Show.find_by(title: escape_ampersands(params[:id]))
    @item = WatchlistItem.find_by(user_id: current_user.id, show_id: show.id)
    if @item
      @item.destroy!
      render json: @item
    else
      @item = current_user.watchlist_items.create({
        show_id: show.id
      })
      render json: @item
    end
  end

  private
  def show_params
    params.require(:show).permit(:title, :description, :image_url, :maze_id, :network)
  end
end
