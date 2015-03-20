json.extract! @post, :title, :content, :id
json.set! :total_points, @post.total_points
json.set! :endorsed, @endorsed
json.set! :author, @post.author.username
json.set! :author_avatar, image_url(@post.author.avatar.url(:thumb))
json.set! :episode_title, @post.episode.title
json.set! :show_title, @post.episode.show.title
new_tree = Hash.new { |h, k| h[k] = [] }
@post.comment_tree.each do |parent, comments|
  comments.each do |comment|
    tmp = {
      id: comment.id,
      user_id: comment.user_id,
      content: comment.content,
      post_id: comment.post_id,
      parent_id: comment.parent_id,
      created_at: comment.created_at,
      total_points: comment.total_points,
      author: comment.author.username,
      author_avatar: image_url(comment.author.avatar.url(:thumb))
    }
    if !signed_in?
      tmp["endorsed"] = false
    elsif current_user.endorsements.find_by({endorsable_id: comment[:id], endorsable_type: "Comment"})
      tmp["endorsed"] = true
    else
      tmp["endorsed"] = false
    end
    new_tree[parent] << tmp
  end
end
json.set! :comment_tree, new_tree
