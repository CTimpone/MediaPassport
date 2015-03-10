class EpisodesController < ApplicationController
  def show
    @episode = Episode.includes(:posts).find(params[:id])
    render :show
  end
end
