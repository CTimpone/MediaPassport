class RatingsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update]


  def create
    @rating = current_user.ratings.new(rating_params)
    if @rating.save
      render json: @rating
    else
      render json: {errors: @rating.errors.full_messages}
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update_attributes(rating_params)
      render json: @rating
    else
      render json: {errors: @rating.errors.full_messages}
    end
  end

  private
  def rating_params
    params.require(:rating).permit(:episode_id, :score)
  end
end
