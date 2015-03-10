class CreateEpisodes < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.integer :show_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :maze_id
      t.integer :season, null: false
      t.integer :position, null: false
      t.date :airdate, null: false
      t.timestamps
    end
    add_index :episodes, [:show_id, :maze_id]
  end
end
