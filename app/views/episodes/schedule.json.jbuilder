json.array! (@schedule) do |episode|
  json.extract! episode, :title, :network, :airtime, :id, :runtime, :season, :position
  json.set! :show_title, episode.show.title
end
