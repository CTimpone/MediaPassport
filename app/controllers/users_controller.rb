class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render "sessions/show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end
end
