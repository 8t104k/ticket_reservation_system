# frozen_string_literal: true

# トークンを生成する機能
module Generatetoken
  extend ActiveSupport::Concern

  included do
    before_create :generate_token
    validates :token, uniqueness: true, allow_nil: true
  end

  private

  def generate_token
    return if self.token.present?

    self.token = loop do
      random_token = SecureRandom.urlsafe_base64(8)
      break random_token unless self.class.exists?(token: random_token)
    end
  end
end