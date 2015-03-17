class EpisodesController < ApplicationController
  def show
    @episode = current_show.episodes.includes(:posts).find_by(title: episode_title)
    current_user ? current_rating = current_user.ratings.find_by({episode_id: @episode.id}) : current_rating = nil
    if current_rating
      @rating_id = current_rating.id
      @score = current_rating.score
    else
      @rating_id = nil
      @score = nil
    end
    render "show.json.jbuilder"
  end

  def verify
    @episode = Show.find_by({title: show_title}).episodes.find_by({title: episode_title})
    if @episode
      render json: @episode
    else
      render json: {verify: ["Episode does not exist"]}
    end
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
    @episode = current_show.episodes.find_by(title: escape_ampersands(episode_title))
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
    Show.find_by(title: escape_ampersands(show_title))
  end

  def episode_title
    escape_ampersands(params[:id]) if params[:id]
  end

  def show_title
    escape_ampersands(params[:show_id])
  end
end
