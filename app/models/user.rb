class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, maximum: 30}, allow_nil: true
  validates :username, length: {minimum: 5, maximum: 18}
  after_initialize :ensure_session_token

  has_many(
    :posts,
    class_name: "Post",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :endorsements,
    class_name: "Endorsement",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :ratings,
    class_name: "Rating",
    foreign_key: :user_id,
    primary_key: :id
  )

  def self.find_by_credentials(params)
    user = User.find_by(username: params[:username])
    if user && user.is_password?(params[:password])
      return user
    else
      return nil
    end
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end


end
