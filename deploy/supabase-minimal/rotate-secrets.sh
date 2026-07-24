#!/bin/sh
set -eu

deploy_dir=/opt/betterlife/supabase-minimal
new_db_password=$(openssl rand -hex 32)
new_api_password=$(openssl rand -hex 32)

docker exec -i betterlife-db psql \
  --username postgres \
  --dbname betterlife \
  --set=ON_ERROR_STOP=1 \
  --set=db_password="$new_db_password" \
  --set=api_password="$new_api_password" <<'EOSQL'
alter role postgres password :'db_password';
alter role authenticator password :'api_password';
EOSQL

umask 077
env_tmp=$(mktemp "$deploy_dir/.env.XXXXXX")
trap 'rm -f "$env_tmp"' EXIT
printf 'POSTGRES_PASSWORD=%s\nPGRST_API_PASSWORD=%s\n' \
  "$new_db_password" "$new_api_password" > "$env_tmp"
mv "$env_tmp" "$deploy_dir/.env"
trap - EXIT

cd "$deploy_dir"
docker compose up -d --force-recreate --wait
