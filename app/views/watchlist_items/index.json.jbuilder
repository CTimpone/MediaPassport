json.array! (@items) do |item|
  json.extract! item, :show_id, :id
  json.set! :title, item.show.title
  json.set! :rec, false
end

json.array! (current_user.recommendations) do |rec|
  json.set! :title, rec.title
  json.set! :rec, true
end
