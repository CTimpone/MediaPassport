json.extract! @post, :title, :content, :id
json.set! :endorsed, !!current_user.endorsements.find_by({endorsable_type: "Post", endorsable_id: @post.id})
json.set! :author, @post.author.username
json.set! :episode_title, @post.episode.title
json.set! :show_title, @post.episode.show.title
json.set! :comment_tree, @tree
# end
