require 'rails_helper'

RSpec.describe Show, type: :model do
  let (:user) { FactoryGirl.build(:show) }

  before (:each) do
    user.save
  end

  it "does not require an image url" do
    expect(Show.last.image_url).to be_falsy
  end

  it "does not require a maze id" do
    expect(Show.last.maze_id).to be_falsy
  end

  it { should belong_to(:network)}

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:network_id) }

  it { should validate_uniqueness_of(:title) }
  it { should validate_uniqueness_of(:maze_id) }
end
