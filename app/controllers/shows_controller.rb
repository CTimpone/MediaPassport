class ShowsController < ApplicationController
  def show
    @show = Show.includes(:episodes).find(params[:id])
    render :show
  end

  def index
    @shows = Show.all
    render :index
  end

  def create
    @show = Show.new(show_params)
    if @show.save
      render :show
    else
      flash[:errors] = @show.errors.full_messages
      redirect_to shows_url
    end
  end

  private
  def show_params
    params.require(:show).permit(:title, :description, :image_url, :maze_id, :network_id)
  end
end
