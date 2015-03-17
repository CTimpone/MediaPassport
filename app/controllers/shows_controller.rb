class ShowsController < ApplicationController
  def show
    @show = Show.includes(:episodes).find_by(title: escape_ampersands(params[:id]))
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

  def watchlist_toggle
    @show = Show.find_by(title)
  end

  private
  def show_params
    params.require(:show).permit(:title, :description, :image_url, :maze_id, :network)
  end
end
