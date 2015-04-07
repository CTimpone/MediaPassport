class CommentsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update, :endorse]

  def new
    @comment = Comment.new
    render :new
  end

  def create
    @comment = current_user.comments.new(new_comment_params)
    if @comment.save
      @comment.post.touch
      render json: @comment
    else
      render json: {errors: @comment.errors.full_messages}, status: 422
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    render :edit
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(edit_comment_params)
      render json: @comment
    else
      render json: {errors: @comment.errors.full_messages}, status: 422
    end
  end

  def endorse
    @comment = Comment.find(params[:id])
    @endorsement = @comment.endorsements.find_by({user_id: current_user.id})
    if (@endorsement)
      @endorsement.destroy!
      render json: @endorsement
    else
      @endorsement = current_user.endorsements.create!({
        endorsable_id: @comment.id,
        endorsable_type: "Comment"
      })
      render json: @endorsement
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
