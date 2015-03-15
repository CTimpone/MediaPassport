class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id, null: false
      t.integer :episode_id, null: false
      t.integer :score, null: false
      t.timestamps
    end

    add_index :ratings, [:user_id, :episode_id]
  end
end
