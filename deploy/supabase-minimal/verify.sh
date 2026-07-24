#!/bin/sh
set -eu

test_email="codex-deploy-test@example.invalid"
api_url="${API_URL:-http://127.0.0.1:3000/waitlist_entries}"
expected_get="${EXPECTED_GET:-401}"

cleanup() {
  docker exec betterlife-db psql -U postgres -d betterlife \
    -c "delete from api.waitlist_entries where email = '$test_email';" >/dev/null
  rm -f /tmp/betterlife-post-one.out /tmp/betterlife-post-two.out /tmp/betterlife-get.out
}
trap cleanup EXIT
cleanup

post_one=$(curl -sS -o /tmp/betterlife-post-one.out -w '%{http_code}' \
  -X POST "$api_url" \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=minimal' \
  -d "{\"email\":\"$test_email\",\"moment\":\"cant-start\"}")

post_duplicate=$(curl -sS -o /tmp/betterlife-post-two.out -w '%{http_code}' \
  -X POST "$api_url" \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=minimal' \
  -d "{\"email\":\"$test_email\",\"moment\":\"cant-start\"}")

get_denied=$(curl -sS -o /tmp/betterlife-get.out -w '%{http_code}' "$api_url")
row_count=$(docker exec betterlife-db psql -U postgres -d betterlife -Atc \
  "select count(*) from api.waitlist_entries where email = '$test_email';")

printf 'POST=%s DUPLICATE=%s GET=%s ROWS=%s\n' \
  "$post_one" "$post_duplicate" "$get_denied" "$row_count"

[ "$post_one" = "201" ]
[ "$post_duplicate" = "409" ]
[ "$get_denied" = "$expected_get" ]
[ "$row_count" = "1" ]
