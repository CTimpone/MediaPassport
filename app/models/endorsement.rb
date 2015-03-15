class Endorsement < ActiveRecord::Base
  validates :user_id, :endorsable_type, :endorsable_id, presence: true
  validates :endorsable_type, inclusion: { in: ["Post", "Comment"] }
  validates :user_id, uniqueness: {scope: [:endorsable_type, :endorsable_id]}

  belongs_to :endorsable, polymorphic: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
end
