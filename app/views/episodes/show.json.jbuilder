json.extract! @episode, :title, :description, :season, :position, :image_url, :id
json.set! :current_user_rating, @score
json.set! :posts do
  json.array! (@episode.posts) do |post|
    json.extract! post, :title, :id, :content
    json.set! :author, post.author.username
  end
end
