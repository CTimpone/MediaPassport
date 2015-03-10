class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :commentable_id, null: false
      t.string :commentable_type, null: false
      t.text :content, null: false
      t.timestamps
    end
    add_index :comments, [:user_id, :commentable_id]
  end
end
