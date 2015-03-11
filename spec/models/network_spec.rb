require 'rails_helper'

RSpec.describe Network, type: :model do
  let (:network) { FactoryGirl.build(:network) }

  before (:each) do
    network.save
    3.times do |num|
      FactoryGirl.create(:show, title: num, network_id: network.id)
    end
    network.shows.each_with_index do |show, index|
      3.times do |num|
        FactoryGirl.create(:episode, show_id: show.id, position: num, airdate: (Date.today - 5 * (index)))
      end
    end
  end

  it "has 3 episodes today" do
    expect(network.episodes_today.length).to eq(3)
  end

  it "has 0 episodes yesterday" do
    expect(network.episodes_yesterday.length).to eq(0)
  end

  it "has 6 episodes in the last week" do
    expect(network.episodes_week.length).to eq(6)
  end

  it { should have_many(:shows) }

  it { should validate_presence_of(:name) }
end
