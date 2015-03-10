class EpisodesController < ApplicationController
  def show
    @episode = Episode.find(params[:id])
    @posts = @episode.posts
    render :show
  end
end
