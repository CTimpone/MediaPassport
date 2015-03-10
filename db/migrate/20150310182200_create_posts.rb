class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.integer :episode_id, null: false
      t.string :title, null: false
      t.text :content, null: false
      t.timestamps
    end
    add_index :posts, [:user_id, :episode_id]
  end
end
