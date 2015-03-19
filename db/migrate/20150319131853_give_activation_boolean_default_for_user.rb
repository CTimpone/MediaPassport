class GiveActivationBooleanDefaultForUser < ActiveRecord::Migration
  def change
    change_column :users, :active, :boolean, default: false
  end
end
