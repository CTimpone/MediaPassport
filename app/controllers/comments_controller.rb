class CommentsController < ApplicationController
  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      redirect_to post_url(@comment.post_id)
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to :back
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :parent_id, :post_id)
  end
end
