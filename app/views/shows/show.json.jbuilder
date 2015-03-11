json.extract! @show, :title, :description, :image_url

json.set! :episodes do
  json.array! (@show.episodes) do |episode|
    json.extract! episode, :title, :id, :season, :position, :description
  end
end
