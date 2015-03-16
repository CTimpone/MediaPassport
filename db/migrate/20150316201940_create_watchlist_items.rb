class CreateWatchlistItems < ActiveRecord::Migration
  def change
    create_table :watchlist_items do |t|
      t.integer :user_id, null: false
      t.integer :show_id, null: false
      t.timestamps
    end

    add_index :watchlist_items, [:user_id, :show_id]
  end
end
