class ContextService
  def self.with_auth_transaction(user_id = nil)
    ActiveRecord::Base.transaction do
      conn = ActiveRecord::Base.connection
      conn.execute("SET LOCAL role = 'authenticated'")

      if user_id.present?
        claims = { sub: user_id }.to_json
        conn.execute("SET LOCAL request.jwt.claims TO '#{claims}';")
      end

      yield
    end
  rescue => e
    Rails.logger.error("Auth transaction error: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    
    raise e
  end
end