class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  attr_reader :password

  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private
  def ensure_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end


end
