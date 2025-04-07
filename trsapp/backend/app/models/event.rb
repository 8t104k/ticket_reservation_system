class Event < ApplicationRecord
  include Generatetoken
  has_many :reservations, dependent: :destroy
  has_many :collaborators, dependent: :destroy
  has_many :profiles, through: :collaborators
  has_one :reservation_share, dependent: :destroy

  after_create :set_draft_status

  enum status: {
    draft: 10,
    open: 20,
    close: 90,
    deleted: 99
  }

  scope :recent, -> { order(id: :desc) }

  private

  def set_draft_status
    self.draft!
  end

end
