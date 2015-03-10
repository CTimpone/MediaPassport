class PostsController < ApplicationController
  def create
    post = current_user.posts.new(post_params)
    if post.save
      redirect_to :back
    else
      flash[:errors] = post.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @post = Post.includes(:episode).find(params[:id])
    render :show
  end


  private
    def post_params
      params.require(:post).permit(:title, :content, :episode_id)
    end
end
