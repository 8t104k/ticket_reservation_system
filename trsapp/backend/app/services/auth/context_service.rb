class ContextService
  def self.with_auth_context(user_id = nil)
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