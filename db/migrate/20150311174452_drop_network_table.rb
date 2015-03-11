class DropNetworkTable < ActiveRecord::Migration
  def change
    drop_table :networks
  end
end
