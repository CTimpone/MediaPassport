require 'rails_helper'

RSpec.describe Post, type: :model do
  let (:post) { FactoryGirl.build(:post) }

  before (:each) do
    post.save
  end

  it { should belong_to(:author)}
  it { should belong_to(:episode)}

  it { should validate_presence_of(:episode_id) }
  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:content) }

  it { should validate_uniqueness_of(:title).scoped_to(:episode_id) }

end
