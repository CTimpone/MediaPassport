json.extract! @post, :title, :content, :id
json.set! :total_points, @post.total_points
json.set! :endorsed, @endorsed
json.set! :author, @post.author.username
json.set! :author_avatar, image_url(@post.author.avatar.url(:thumb))
json.set! :episode_title, @post.episode.title
json.set! :show_title, @post.episode.show.title
json.set! :comment_tree, @tree
