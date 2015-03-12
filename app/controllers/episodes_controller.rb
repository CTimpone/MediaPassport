class EpisodesController < ApplicationController
  def show
    @episode = current_show.episodes.includes(:posts).find_by(title: params[:id].gsub('_', ' '))
    render "show.json.jbuilder"
  end

  def create
    @episode = current_show.episodes.new(episode_params)
    @episode.airdate = Date.parse(episode_params[:airdate]);
    if @episode.save
      render json: @episode
    else
      render json: {errors: @episode.errors.full_messages}
    end
  end

  def update
    @episode = current_show.episodes.find_by(title: params[:id].gsub('_', ' '))
    if @episode.update_attributes(episode_params)
      render json: @episode
    else
      render json: {errors: @episode.errors.full_messages}
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
