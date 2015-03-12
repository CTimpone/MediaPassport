class EpisodesController < ApplicationController
  def show
    @episode = Episode.includes(:posts).find(params[:id])
    render :show
  end

  def create
    @episode = current_show.episodes.new(episode_params)
    @episode.airdate = Date.parse(episode_params[:airdate]);
    if @episode.save
      render json: @episode
    # else
    #   render json: @episode.errors.full_messages
    end
  end

  private
  def episode_params
    params.require(:episode).permit(:season, :position, :airdate, :title, :description, :maze_id, :image_url)
  end

  def current_show
    Show.find_by(title: params[:show_id].gsub('_', ' '))
  end
end
