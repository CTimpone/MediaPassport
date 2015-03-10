FactoryGirl.define do
  factory :episode do
    title "Fake Episode"
    show_id 1
    season 1
    position 1
    airdate Date.new(2015, 3, 9)
  end
end
