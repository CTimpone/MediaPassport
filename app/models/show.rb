class Show < ActiveRecord::Base
  validates :title, :description, :network_id, presence: true
  validates :title, :maze_id, uniqueness: true

  belongs_to(
    :network,
    class_name: "Network",
    foreign_key: :network_id,
    primary_key: :id
  )

  has_many(
    :episodes,
    class_name: "Show",
    foreign_key: :show_id,
    primary_key: :id
  )
end
