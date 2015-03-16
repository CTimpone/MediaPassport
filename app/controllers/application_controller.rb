class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :signed_in?, :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    session[:token] = user.reset_session_token
  end

  def sign_out!
    current_user.reset_session_token
    session[:token] = nil
  end

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def escape_ampersands(string)
    string = URI.unescape(string)
    string.gsub('&amp;', '&')
  end
end
