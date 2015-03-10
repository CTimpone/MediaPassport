class ShowsController < ApplicationController
  def show
    @show = Show.find(params[:id])
    @episodes = @show.episodes.order(:airdate)
    render :show
  end
end
