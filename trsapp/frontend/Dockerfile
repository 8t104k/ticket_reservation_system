# frontend/Dockerfile

FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.json と yarn.lock をコピー
COPY package.json yarn.lock /app/

# 依存関係をインストール
RUN yarn add vuetify@next @mdi/font vite-plugin-vuetify @supabase/supabase-js pinia && \
    yarn install

# アプリケーションコードをコピー
COPY . /app

# ポートを開放
EXPOSE 5173

# デフォルトコマンド
CMD ["yarn", "dev", "--host", "0.0.0.0"]