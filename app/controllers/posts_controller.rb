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

  def endorse
    @post = Post.find(params[:id])
    @endorsement = @post.endorsements.find_by({user_id: current_user.id})
    if (@endorsement)
      @endorsement.destroy!
      render json: @endorsement
    else
      @endorsement = current_user.endorsements.create!({
        endorsable_id: @post.id,
        endorsable_type: "Post"
      })
      render json: @endorsement
    end
  end


  private
    def post_params
      params.require(:post).permit(:title, :content, :episode_id)
    end

end
