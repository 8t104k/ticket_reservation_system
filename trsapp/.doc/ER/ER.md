```mermaid

erDiagram
    %% テーブル間のリレーション
    Events ||--o{ Reservations : "has"
    Events ||--o{ Collaborators : "has"
    Events ||--o{ Groups : "has"
    Groups }o--o{ Collaborators : "has"
    Events ||--o{ EventShare : "has"
    Events ||--o{ ReserveShare : "has"
    AuthConnection ||--|| auth_Users : "connects to"
    public_Profiles ||--|| auth_Users : "belongs to"
    Collaborators }o--|| AuthConnection : "associated with"

    %% Rails バックエンドテーブル
    Events {
        bigint event_id PK "Rails"
        text event_name "イベント名"
        datetime event_date "開催日時"
        text status "ステータス"
        string event_token "イベント識別トークン"
    }
    
    Reservations {
        bigint reservation_id PK "Rails"
        bigint event_id FK "イベントID"
        text reservation_name "予約名"
        decimal price "価格"
        text status "予約ステータス"
        text customer_info "顧客情報(JSON)"
        datetime reserved_at "予約日時"
        datetime expires_at "有効期限"
    }
    
    Collaborators{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        string user_id FK "ユーザーID"
        string member_role "メンバー役割"
        string access_status "アクセス状態"
        string access_token "アクセストークン"
    }
    
    Groups{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        string group_name "グループ名"
        string prof_img "プロフィール画像"
    }

    EventShare{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        bigint collaborator_id FK "作成者ID"
        string token "JWT生成用シークレット"
        string url_token "URL短縮トークン"
        datetime created_at "作成日時"
        datetime expires_at "有効期限"
        boolean is_active "有効フラグ"
    }
    
    ReserveShare{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        bigint collaborator_id FK "作成者ID"
        string url_token "URL短縮トークン"
        datetime created_at "作成日時"
        datetime expires_at "有効期限"
        boolean is_active "有効フラグ"        
    }
    
    AuthConnection {
        bigint id PK "Rails"
        string user_id FK "SupabaseユーザーID"
        string jwt_token "認証トークン"
        datetime last_verified_at "最終検証日時"
    }

    %% Supabase テーブル
    auth_Users {
        uuid id PK "Supabase"
        string email "メールアドレス"
        string password "パスワード(ハッシュ)"
        boolean email_confirmed "メール確認済み"
        datetime created_at "作成日時"
        datetime last_sign_in "最終ログイン"
    }
    
    public_Profiles{
        uuid id PK "Supabase"
        uuid user_id FK "ユーザーID"
        string email "メールアドレス"
        string username "ユーザー名"
        text avatar_url "アバター画像URL"
        text display_name "表示名"
        datetime updated_at "更新日時"
    }