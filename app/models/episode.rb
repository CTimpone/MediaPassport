class Episode < ActiveRecord::Base
  validates :show_id, :title, :season, :position, :airdate, presence: true
  validates :maze_id, uniqueness: true, allow_nil: true
  validates :position, uniqueness: {scope: [:season, :show_id]}

  belongs_to(
    :show,
    class_name: "Show",
    foreign_key: :show_id,
    primary_key: :id
  )

  has_many(
    :posts,
    class_name: "Post",
    foreign_key: :episode_id,
    primary_key: :id
  )

  has_many(
    :ratings,
    class_name: "Rating",
    foreign_key: :episode_id,
    primary_key: :id
  )

  def self.this_week
    self.all.where("airdate >= ?", Date.today - 7)
  end

  def self.today
    self.all.where("airdate = ?", Date.today)
  end
end
