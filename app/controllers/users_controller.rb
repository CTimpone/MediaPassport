class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      msg = UserMailer.welcome_email(@user)
      msg.deliver
      render json: {}
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def activate
    @user = User.find(Integer(params[:id]))

    if @user && @user.session_token == params[:a]
      @user.active = true
      @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      redirect_to root_url
    end
  end
end
