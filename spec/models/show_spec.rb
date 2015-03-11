require 'rails_helper'

RSpec.describe Show, type: :model do
  let (:show) { FactoryGirl.build(:show) }

  before (:each) do
    show.save

    3.times do |num|
      FactoryGirl.create(:episode, show_id: show.id, position: num, airdate: (Date.today - 5 * num))
    end
  end

  it "has an episode with today's airdate" do
    expect(show.most_recent_episode.airdate).to eq(Date.today)
  end

  it "has a string timeframe that is a string" do
    expect(show.timeframe.class).to eq(String)
  end

  it "has one season" do
    expect(show.seasons).to eq(1)
  end

  it "has three episodes" do
    expect(show.num_episodes).to eq(3)
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

  it { should allow_value(nil).for(:maze_id) }

  describe "otherwise has unique maze id" do
    before { show.update_attribute :maze_id, 12}
    it { should validate_uniqueness_of(:maze_id)}
  end
end
