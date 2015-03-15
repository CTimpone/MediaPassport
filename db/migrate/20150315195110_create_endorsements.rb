class CreateEndorsements < ActiveRecord::Migration
  def change
    create_table :endorsements do |t|
      t.integer :user_id, null: false
      t.string :endorseable_type, null: false
      t.integer :endorseable_id, null: false
      t.timestamps
    end

    add_index :endorsements, [:user_id, :endorseable_id]
  end
end
