class Endorsement < ActiveRecord::Base
  validates :user_id, :endorsable_type, :endorsable_id, presence: true
  validates :endorsable_type, inclusion: { in: ["Post", "Comment"] }

  belongs_to :endorsable, polymorphic: true
end
