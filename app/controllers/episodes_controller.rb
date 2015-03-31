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

  def batch_verify
    data = params["episodes"]
    arr = []
    data.each do |key, episode|
      show_maze = episode["show_maze_id"]
      show = Show.find_by({maze_id: Integer(show_maze)})

      year = episode["year"]

      episode.delete('year')
      episode.delete('show_maze_id')

      actual = show.episodes.find_by({maze_id: episode["maze_id"]})

      if !actual
        title_check = show.episodes.find_by({title: episode["title"]})

        if !title_check
          show.episodes.create(episode)

        else
          episode.title += " (" + year + ")"
          show.episodes.create(episode)
        end
      end
    end

    render json: arr
  end

  def create
    @episode = current_show.episodes.new(episode_params)
    @episode.airdate = Date.parse(episode_params[:airdate])
    if @episode.save
      render json: @episode
    else
      render json: {errors: @episode.errors.full_messages}
    end
  end

  def batch_create
    data = params["episodes"]
    arr = []
    data.each do |key, episode|
      arr.push(episode)
    end
    current_show.episodes.create!(arr)
    render json: arr
  end

  def update
    @episode = current_show.episodes.find_by(title: escape_ampersands(episode_title))
    if @episode.update_attributes(episode_params)
      render json: @episode
    else
      render json: {errors: @episode.errors.full_messages}
    end
  end

  def schedule
    @schedule = Episode.today.includes(:show)
    render "schedule.json.jbuilder"
  end

  private
  def episode_params
    params.require(:episode).permit(
    :season,
    :position,
    :airdate,
    :title,
    :description,
    :maze_id,
    :image_url,
    :airtime,
    :network,
    :runtime
  )
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
