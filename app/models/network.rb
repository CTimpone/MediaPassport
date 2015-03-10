class Network < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many(
    :shows,
    class_name: "Show",
    foreign_key: :network_id,
    primary_key: :id
  )

  has_many :episodes, through: :shows, source: :episodes

  def episodes_today
    episodes.where(airdate: Date.today)
  end

  def episodes_yesterday
    episodes.where(airdate: Date.today - 1)
  end

  def episodes_week
    episodes.where("airdate >= ?", Date.today - 7)
  end
end
