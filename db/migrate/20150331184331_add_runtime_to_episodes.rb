class AddRuntimeToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :runtime, :integer
  end
end
