```mermaid

sequenceDiagram
    %% アクター定義とスタイル
    actor オーガナイザー as オーガナイザー
    participant フロント as フロントエンド<br/>(Vue3+Pinia)
    participant Supabase as Supabase認証
    participant バックエンド as バックエンド<br/>(Rails API)
    
    %% ログインプロセス
    rect rgb(101, 120, 147)
    Note over オーガナイザー,バックエンド: 【フェーズ1】ログインプロセス
    オーガナイザー->>+フロント: ログイン画面アクセス
    フロント-->>-オーガナイザー: ログインフォーム表示
    
    オーガナイザー->>+フロント: 認証情報入力・送信
    フロント->>+Supabase: 認証リクエスト<br/>(email, password)
    Note right of Supabase: ユーザー認証処理
    Supabase-->>-フロント: JWT + ユーザー情報
    
    %% StoreへのJWT保存
    Note right of フロント: Pinia Storeに<br/>JWT・ユーザー情報保存
    フロント-->>-オーガナイザー: ログイン成功表示
    end
    
    %% データ取得プロセス
    rect rgb(13, 35, 30)
    Note over オーガナイザー,バックエンド: 【フェーズ2】データ取得プロセス
    
    フロント->>+バックエンド: APIリクエスト<br/>(JWT付きAuthorizationヘッダー)
    Note right of バックエンド: JWTの検証<br/>権限確認
    
    opt Webhookによる通知
        Supabase-->>バックエンド: ログインイベント通知
    end
    
    バックエンド->>+Supabase: JWTの検証(必要な場合)
    Supabase-->>-バックエンド: 検証結果
    
    バックエンド-->>-フロント: イベントデータ返却
    
    Note right of フロント: Pinia Storeに<br/>データを保存
    フロント-->>オーガナイザー: ダッシュボード表示
    end