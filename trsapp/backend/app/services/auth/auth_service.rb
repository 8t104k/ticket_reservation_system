# app/services/auth/auth_service.rb
class AuthService
  JWT_SECRET = ENV['SUPABASE_JWT_SECRET']
  class AuthError < StandardError; end

  class << self
    def verify_and_extract_user_id(request)
      token = extract_token_from_header(request)
      payload = JsonWebToken.decode(token)
      payload['sub']
    rescue StandardError => e
      raise AuthError, "認証エラー：#{ e.message }"
    end

    def extract_token_from_header(request)
      header = request.headers['Authorization']
      token = header&.split(' ')&.last

      raise AuthError, '認証ヘッダーがありません' if header.nil?

      token
    end
  end
end
