class FixColumnNamesForEndorsement < ActiveRecord::Migration
  def change
    remove_column :endorsements, :endorseable_type
    remove_column :endorsements, :endorseable_id

    add_column :endorsements, :endorsable_type, :string
    add_column :endorsements, :endorsable_id, :integer
    add_index :endorsements, :endorsable_id
  end
end
