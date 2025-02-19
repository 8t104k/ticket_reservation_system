# !/bin/bash
set -e

# Rails固有のserver.pidを削除
rm -f /app/tmp/pids/server.pid

bundle install

# コンテナのメインプロセスを実行
exec "$@"