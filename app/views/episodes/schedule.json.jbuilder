json.array! (@schedule) do |episode|
  json.extract! episode, :title, :network, :airtime, :id, :runtime, :description, :season, :position
  json.set! :show_title, episode.show.title
  json.set! :show_id, episode.show.id
end
