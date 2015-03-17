json.extract! @show, :title, :description, :image_url, :id
json.set! :seasons, @show.seasons
json.set! :watching, @endorsed
json.set! :episodes do
  json.array! (@show.episodes) do |episode|
    json.extract! episode, :title, :image_url, :id, :season, :airdate, :position, :description
    json.set! :show_title, @show.title
  end
end
