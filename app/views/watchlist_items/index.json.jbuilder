json.array! (@items) do |item|
  json.extract! item, :show_id, :id
  json.set! :title, item.show.title
end
