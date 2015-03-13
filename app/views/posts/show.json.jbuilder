json.extract! @post, :title, :content, :id
json.set! :episode_title, @post.episode.title
json.set! :show_title, @post.episode.show.title
json.set! :comment_tree, @post.comment_tree
# end
