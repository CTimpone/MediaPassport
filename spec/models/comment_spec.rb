require 'rails_helper'

RSpec.describe Comment, type: :model do

  it { should belong_to(:author)}
  it { should belong_to(:post)}
  it { should belong_to(:parent)}
  it { should have_many(:children)}

  it { should validate_presence_of(:post_id) }
  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:content) }
end
