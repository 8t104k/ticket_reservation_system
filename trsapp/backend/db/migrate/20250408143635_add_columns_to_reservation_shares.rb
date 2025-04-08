class AddColumnsToReservationShares < ActiveRecord::Migration[7.1]
  def change
    add_column :reservation_shares, :font_info, :jsonb
    add_column :reservation_shares, :color_info, :jsonb
    add_column :reservation_shares, :background_img, :text
    add_column :reservation_shares, :extracted_colors, :jsonb
  end
end
