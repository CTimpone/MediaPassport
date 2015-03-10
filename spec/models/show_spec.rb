require 'rails_helper'

RSpec.describe Show, type: :model do
  let (:user) { FactoryGirl.build(:show) }

  before (:each) do
    user.save
  end

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:network_id) }

  it { should validate_uniqueness_of(:title) }
end
