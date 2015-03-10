class SessionsController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = ["Invalid credentials"]
      redirect_to new_session_url
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end
end
