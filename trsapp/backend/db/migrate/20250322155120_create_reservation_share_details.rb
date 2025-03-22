class CreateReservationShareDetails < ActiveRecord::Migration[7.1]
  def change
    create_table :reservation_share_details do |t|
      t.references :reservation_shares, null: false, foreign_key: true
      t.string :token
      t.jsonb :font_info, default: {
        family: 'Roboto',
        size: '16px',
        weight: 400
      }
      t.jsonb :color_info, default: {
        primary: '#FF9800',
        secondary: '#FFCC80',
        background: '#F5F5F5',
        text: '#303030'
      }
      t.string :background_img
      t.jsonb :extracted_colors

      t.timestamps
    end

    add_index :reservation_share_details, :token, unique: true
  end
end
