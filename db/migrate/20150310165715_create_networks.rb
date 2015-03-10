class CreateNetworks < ActiveRecord::Migration
  def change
    create_table :networks do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
