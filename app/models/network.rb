class Network < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many(
    :shows,
    class_name: "Show",
    foreign_key: :network_id,
    primary_key: :id
  )
end
