class Episode < ActiveRecord::Base
  validates :show_id, :title, :season, :position, :airdate, presence: true
  validates :maze_id, uniqueness: true
  
  belongs_to(
    :show,
    class_name: "Show",
    foreign_key: :show_id,
    primary_key: :id
  )
end
