# ticket_reservation_system

# Readme

# 機能一覧

# 使用技術

- 会員登録機能
    - ログインログアウト
    - 非会員認証
- イベント作成機能
    - イベント作成、編集、削除
- コラボレーター機能
    - コラボレーター招待
    - 削除
- 予約機能
    - 予約作成、編集、削除
    - 予約招待ページ作成
    - 予約検索
    - 予約出力
- プロフィール機能
    - 表示名編集
    - メールアドレス変更
    - 

| フロント | Vue |
| --- | --- |
| CSSフレームワーク | Vuetify |
| バックエンド | Ruby on Rails |
| DB |  Postgres |
| DBサーバー・認証 | Supabase |
| デプロイ | Render |
| 開発環境 | Docker |

# ER図

```mermaid
erDiagram
    %% テーブル間のリレーション
    Events ||--o{ reservations : "has"
    Events ||--|{ collaborators : "has"
    Events ||--o| EventShare : "has-one"
    Events ||--o| reservation_shares : "has-one"
    Group |o--o{ collaborators : "has-many"
    collaborators }o--|| Profiles : "has-many"
    Profiles ||--|| "auth.Users" : "connect to"
    Group ||--o{ Profiles_Groups : "has-many"
    Profiles ||--o{ Profiles_Groups : "has-many"    

    %% Rails バックエンドテーブル
    Events {
        bigint event_id PK "Rails"
        text event_name "イベント名"
        date event_date "開催日"
        time open_time "オープン時間"
        time start_time "スタート時間"
        time close_time "クローズ時間"
        text status "ステータス"
        string event_token "イベント識別トークン"
        text location "開催場所"
        text event_img "メイン画像"
    }
    
    reservations {
        bigint reservation_id PK "Rails"
        bigint event_id FK "イベントID"
        string collaborator_id FK "コラボレーターID"
        text reservation_name "予約名"
        decimal price "価格"
        text status "予約ステータス"
        text customer_info "顧客情報(JSON)"
        datetime reserved_at "予約日時"
        datetime expires_at "有効期限"
    }
    
    collaborators{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        bigint profile_id FK "プロフィールID"
        bigint group_id FK "グループID"
        string role "メンバー役割"
        string access_status "アクセス状態"
    }
    
    EventShare{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        string token "URL短縮トークン"
        datetime created_at "作成日時"
        datetime expires_at "有効期限"
        boolean status "有効フラグ"
    }
    
    reservation_shares{
        bigint id PK "Rails"
        bigint event_id FK "イベントID"
        bigint collaborator_id FK "共演者ID"
        string token "reservationshare トークン"
        datetime created_at "作成日時"
        datetime expires_at "有効期限"
        string status "有効フラグ"
        jsonb font_info "フォント情報"
        jsonb color_info "カラーパレット"
        string background_img "背景画像URL"
        jsonb extracted_colors "抽出されたカラーパレットリスト"
    }

    %% Supabase テーブル
    "auth.Users" {
        uuid id PK "Supabase"
        string email "メールアドレス"
        string password "パスワード(ハッシュ)"
        boolean email_confirmed "メール確認済み"
        datetime created_at "作成日時"
        datetime last_sign_in "最終ログイン"
    }
    
    Profiles{
        uuid id PK ""
        uuid user_id FK "ユーザーID"
        string email "メールアドレス"
        string username "ユーザー名"
        text avatar_url "アバター画像URL"
        text display_name "表示名"
        datetime updated_at "更新日時"
    }
    Group {
    bigint id PK ""
    string group_name "グループ名"
    string img_name "画像名()"
    string object_id "ストレージオブジェクトID"
    }
    Profiles_Groups{
    bigint profile_id FK
    bigint group_id FK
    }

```

# ユースケース

[Notion](https://www.notion.so/1ce5f23057f280b09028ee5cd2be7307?v=1ce5f23057f280529287000c3ed5e5de&pvs=4)

# こだわったところ

- Railsでサービスクラスを導入してみたところ
- バックエンドでもSupabaseのRLSポリシーを適用できるようにしたところ
- 認証やデータベースはSupabaseを使ってみたところ
- 予約受付ページをユーザーが動的に変更できるような構成にしているところ