class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :image_url

      t.integer :maze_id
      t.integer :network_id, null: false
      t.timestamps
    end

    add_index :shows, :network_id
    add_index :shows, :maze_id
  end
end
