class Show < ActiveRecord::Base
  validates :title, :description, :network_id, presence: true
  validates :title, uniqueness: true
end
