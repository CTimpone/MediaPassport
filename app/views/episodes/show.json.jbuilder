json.extract! @episode, :title, :description, :season, :position, :image_url, :id
json.set! :current_user_rating, @score
json.set! :current_rating_id, @rating_id
json.set! :overall_rating, @episode.average_rating
json.set! :voters, @episode.num_ratings

json.set! :posts do
  json.array! (@episode.posts) do |post|
    json.extract! post, :title, :id, :content, :created_at
    json.set! :total_points, post.total_points
    json.set! :author, post.author.username
  end
end
