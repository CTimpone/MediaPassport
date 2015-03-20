class PostsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :endorse]

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: @post
    else
      render json: {errors: @post.errors.full_messages}, status: 422
    end
  end

  def show
    @post = Post.includes(:episode).find(params[:id])
    @tree = @post.comment_tree
    if !current_user
      @endorsed = false
    else
      @endorsed = !!current_user.endorsements.find_by({endorsable_type: "Post", endorsable_id: @post.id})
    end
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
