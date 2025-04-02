# app/services/json_web_token.rb
class JsonWebToken
  SUPABASE_JWT_SECRET = ENV['SUPABASE_JWT_SECRET']
  
  class JsonWebTokenError < StandardError; end

  def self.decode(token)
    JWT.decode(token, SUPABASE_JWT_SECRET, true, { algorithm: 'HS256' })[0]
  rescue JWT::DecodeError => e
    raise JsonWebTokenError, "無効なトークンです：#{e.message}"
  end
end