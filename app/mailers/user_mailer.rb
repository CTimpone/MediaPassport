class UserMailer < ActionMailer::Base
  default from: "registration@media-passport.com"

  def welcome_email(user)
    @user = user
    @url_partial  = '/users/' + user.id.to_s + '/activate?a=' + user.session_token
    mail(to: user.email, subject: 'Welcome to Media Passport')
  end
end
