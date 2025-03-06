require 'jwt'

module Supabase
  class Auth
    ALGORITHM = 'HS256'.freeze

    def self.verify_jwt(token)
      JWT.decode(
        token,
        ENV['SUPABASE_JWT_SECRET'],
        true,
        { algorithm: ALGORITHM }
      )
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT decode error: #{e.message}"
      nil
    end
  end
end