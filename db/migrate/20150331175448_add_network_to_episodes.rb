class AddNetworkToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :network, :string
  end
end
