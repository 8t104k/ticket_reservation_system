class ApplicationController < ActionController::API
  before_action :authenticate_user
  attr_reader :current_user

  private

  def authenticate_user
    begin
      user_id = AuthService.verify_and_extract_user_id(request)
      @current_user = Profile.find_by!(user_id: user_id)
    rescue AuthService::AuthError => e
      render json: { error: e.message }, status: :unauthorized
    end
  end

  def with_auth_context(user_id = nil)
    ActiveRecord::Base.transaction do
      conn = ActiveRecord::Base.connection
      conn.execute("SET LOCAL role = 'authenticated'")
      
      if user_id.present?
        claims = { sub: user_id }.to_json
        conn.execute("SET LOCAL request.jwt.claims TO '#{claims}';")
      end
      
      yield
    end
  end

end
