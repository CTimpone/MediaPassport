json.extract! @post, :title, :content, :id
json.set! :endorsed, @endorsed
json.set! :author, @post.author.username
json.set! :episode_title, @post.episode.title
json.set! :show_title, @post.episode.show.title
json.set! :comment_tree, @tree
# end
