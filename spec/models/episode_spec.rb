require 'rails_helper'

RSpec.describe Episode, type: :model do
  let (:episode) { FactoryGirl.build(:episode) }

  before (:each) do
    episode.save
  end

  it "does not require an image url" do
    expect(Episode.last.image_url).to be_falsy
  end

  it "does not require a maze id" do
    expect(Episode.last.maze_id).to be_falsy
  end

  it { should belong_to(:show)}

  it { should validate_presence_of(:show_id) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:season) }
  it { should validate_presence_of(:position) }
  it { should validate_presence_of(:airdate) }

  it { should validate_uniqueness_of(:maze_id) }
end
