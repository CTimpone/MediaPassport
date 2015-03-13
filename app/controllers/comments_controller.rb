class CommentsController < ApplicationController
  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = current_user.comments.new(new_comment_params)
    if @comment.save
      render json: @comment
    else
      render json: @comment
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    render :edit
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(edit_comment_params)
      redirect_to post_url(@comment.post_id)
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to edit_comment_url(@comment)
    end
  end

  private
  def new_comment_params
    params.require(:comment).permit(:content, :parent_id, :post_id)
  end

  def edit_comment_params
    params.require(:comment).permit(:content)
  end
end
