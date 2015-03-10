class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.create(user_params)
    if @user
      render :show
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
    def user_params
      params.require(:user).permit(:username, :password, :email)
    end

end
