class PostsController < ApplicationController
  def create
    post = current_user.posts.new(post_params)
    if post.save
      render json: post
    else
      render json: post
    end
  end

  def show
    @post = Post.includes(:episode).find(params[:id])
    render "show.json.jbuilder"
  end


  private
    def post_params
      params.require(:post).permit(:title, :content, :episode_id)
    end

    def curent_episode

    end
end
