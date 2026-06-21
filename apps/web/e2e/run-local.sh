#!/usr/bin/env bash
# Local e2e runner: boots a throwaway Postgres (Docker), migrates + seeds it,
# runs Playwright (which starts the app via webServer), then tears the DB down.
# CI does the equivalent with a Postgres service instead (see .github/workflows/e2e.yml).
set -euo pipefail

cd "$(dirname "$0")/.."

export DATABASE_URL="postgresql://postgres:postgres@localhost:5433/bulletin_test?schema=public"
export E2E_PORT="${E2E_PORT:-3100}"
export NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:${E2E_PORT}"
export BETTER_AUTH_URL="http://localhost:${E2E_PORT}"

compose() { docker compose -f e2e/docker-compose.yml "$@"; }

cleanup() { compose down -v >/dev/null 2>&1 || true; }
trap cleanup EXIT

echo "▶ starting throwaway Postgres…"
compose up -d --wait

echo "▶ applying migrations + seed…"
pnpm exec prisma migrate deploy
pnpm exec prisma db seed

echo "▶ running Playwright…"
pnpm exec playwright test "$@"
