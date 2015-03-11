class ShowsController < ApplicationController
  def show
    @show = Show.includes(:episodes).find_by(title: params[:id].gsub('_',' '))
    render :show
  end

  def index
    @shows = Show.all
    render json: @shows
  end

  def create
    @show = Show.new(show_params)
    if @show.save
      render json: @show
    else
      render json: @show.errors.full_messages
    end
  end

  private
  def show_params
    params.require(:show).permit(:title, :description, :image_url, :maze_id, :network)
  end
end
