json.extract! @show, :title, :description, :image_url, :id
json.set! :seasons, @show.seasons
json.set! :watching, @endorsed
json.set! :overall_rating, @show.average_episode_rating

json.set! :episodes do
  json.array! (@show.episodes) do |episode|
    json.extract! episode, :title, :image_url, :id, :season, :airdate, :position, :description
    json.set! :show_title, @show.title
    json.set! :rating, episode.average_rating
    json.set! :voters, episode.num_ratings
  end
end
