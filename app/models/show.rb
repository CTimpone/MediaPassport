class Show < ActiveRecord::Base
  validates :title, :description, :network_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :network,
    class_name: "Network",
    foreign_key: :network_id,
    primary_key: :id
  )
end
