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

  SCORES = {59 => 'F', 60 =>'D-', 63 =>'D',
            67 => 'D+', 70 => 'C-', 73 => 'C',
            77 => 'C+', 80 => 'B-', 83 => 'B',
            87 => 'B+', 90 => 'A-', 93 => 'A',
            100 => 'A+'}

  def self.this_week
    self.all.where("airdate >= ?", Date.today - 7)
  end

  def self.today
    self.all.where("airdate = ?", Date.today)
  end

  def average_rating
    rated = self.ratings.pluck(:score)
    if rated.length > 0
      summed = rated.inject {|sum, rating| sum + rating}
      avg = summed / rated.length
      bucket = SCORES.keys.min_by { |val| (avg - val).abs }
      return SCORES[bucket]
    else
      return "-"
    end
  end

  def num_ratings
    self.ratings.length
  end
end
