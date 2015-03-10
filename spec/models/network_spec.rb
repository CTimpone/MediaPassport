require 'rails_helper'

RSpec.describe Network, type: :model do
  it { should have_many(:shows)}

  it { should validate_presence_of(:name) }
end
