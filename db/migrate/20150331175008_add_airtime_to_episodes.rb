class AddAirtimeToEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :airtime, :string
  end
end
