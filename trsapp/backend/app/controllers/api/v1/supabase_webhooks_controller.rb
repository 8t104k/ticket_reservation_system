class Api::V1::SupabaseWebhooksController < ApplicationController
  skip_before_action :authenticate_supabase_token

  def handle_webhook
    # イベントタイプによって処理を分岐
    case params[:type]
    when 'AUTH_USER_CREATED'
      # 新規ユーザー作成時の処理
      handle_user_created(params[:data])
    when 'AUTH_SIGNED_IN'
      # ログイン時の処理
      handle_user_signed_in(params[:data])
    end

    render json: { success: true }
  end

  private

  def verify_supabase_signature
    signature = request.headers['x-supabase-signature']
    return head :unauthorized unless signature.present?

    # リクエストボディの生データを取得
    request_body = request.raw_post
    
    # 署名の検証
    calculated_signature = Base64.strict_encode64(
      OpenSSL::HMAC.digest('sha256', ENV['SUPABASE_WEBHOOK_SECRET'], request_body)
    )
    
    # 署名が一致しない場合は 401 を返す
    head :unauthorized unless ActiveSupport::SecurityUtils.secure_compare(signature, calculated_signature)
  end

  def handle_user_created(data)
    # AuthConnection テーブルにレコードを作成
    AuthConnection.create!(
      user_id: data[:id],
      jwt_token: data[:jwt],
      last_verified_at: Time.current
    )
  end

  def handle_user_signed_in(data)
    # 最終ログイン日時を更新するなどの処理
    auth_connection = AuthConnection.find_by(user_id: data[:id])
    auth_connection&.update(last_verified_at: Time.current)
  end
end
