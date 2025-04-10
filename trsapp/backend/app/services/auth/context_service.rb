class ContextService
  def self.with_auth_transaction(user_id = nil)
    ActiveRecord::Base.transaction do
      conn = ActiveRecord::Base.connection
      conn.execute("SET LOCAL role = 'authenticated'")

      if user_id.present?
        claims = { sub: user_id }.to_json
        conn.execute("SET LOCAL request.jwt.claims TO '#{claims}';")
      end

      ##デバッグ用
      ## RLSの状態を確認
      #rls_state = ActiveRecord::Base.connection.execute("SHOW row_security").first["row_security"]
      #puts "RLS state: #{rls_state}"
      ## 更新前に明示的にレコードが見えるか確認
      #visibility_check = ActiveRecord::Base.connection.execute(
      #  "SELECT EXISTS(SELECT 1 FROM events WHERE id = #{@event.id})"
      #).first["exists"]
      #puts "Record visible before update: #{visibility_check}"

      yield
    end
  rescue => e
    Rails.logger.error("Auth transaction error: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    
    raise e
  end
end