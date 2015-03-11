require 'rails_helper'

RSpec.describe User, type: :model do
  let (:user) { FactoryGirl.build(:user) }

  before (:each) do
    user.save
  end

  it "mass assigns attributes" do
    expect(user.password_digest).to be_truthy
    expect(user.session_token).to be_truthy
  end

  it "does not store the password as plain text" do
    expect(User.last.password).to be_falsy
  end

  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_presence_of(:session_token) }

  it { should validate_length_of(:password).
        is_at_least(6).is_at_most(30)}

  it { should validate_length_of(:username).
        is_at_least(6).is_at_most(30)}

  it { should validate_uniqueness_of(:username) }
  it { should validate_uniqueness_of(:email) }
end
