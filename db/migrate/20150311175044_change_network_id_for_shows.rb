class ChangeNetworkIdForShows < ActiveRecord::Migration
  def change
    remove_column :shows, :network_id
    add_column :shows, :network, :string
  end
end
