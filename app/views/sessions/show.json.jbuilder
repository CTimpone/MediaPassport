json.extract! current_user, :username, :id, :email
json.set! :avatar_url, image_url(current_user.avatar.url(:thumb))
json.set! :relevant_posts do
  json.array! (current_user.relevant_posts) do |post|
    json.extract! post, :id, :title
    json.set! :points, post.total_points
    json.set! :episode_title, post.episode.title
    json.set! :show_title, post.episode.show.title
  end
end
