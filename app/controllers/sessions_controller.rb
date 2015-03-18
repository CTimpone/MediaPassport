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
    if @user
      sign_in!(@user)
      render "show.json.jbuilder"
    else
      render json: {errors: ["Invalid credentials"]}, status: 422
    end
  end

  def destroy
    sign_out!
    render json: current_user
  end
end
