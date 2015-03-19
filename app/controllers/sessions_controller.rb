class SessionsController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def show
    if current_user
      render "show.json.jbuilder"
    else
      render json: {errors: ["Invalid credentials"]}
    end
  end

  def create
    @user = User.find_by_credentials(user_params)
    if (@user && @user.active)
      sign_in!(@user)
      render "show.json.jbuilder"
    elsif (@user == nil)
      render json: {errors: ["Invalid credentials"]}, status: 422
    elsif !@user.active
      render json: {errors: ["You must first activate your account"]}, status: 422
    end
  end

  def destroy
    sign_out!
    render json: current_user
  end
end
