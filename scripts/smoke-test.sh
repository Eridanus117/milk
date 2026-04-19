#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-4173}"
BASE_URL="http://127.0.0.1:${PORT}"
TMP_PW_DIR="${TMP_PW_DIR:-/tmp/milk-pw}"
SCREENSHOT_PATH="${SCREENSHOT_PATH:-/tmp/milk-smoke.png}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required" >&2
  exit 1
fi

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

mkdir -p "$TMP_PW_DIR"

if [[ ! -f "$TMP_PW_DIR/package.json" ]]; then
  (
    cd "$TMP_PW_DIR"
    npm init -y >/dev/null 2>&1
  )
fi

if [[ ! -d "$TMP_PW_DIR/node_modules/playwright" ]]; then
  (
    cd "$TMP_PW_DIR"
    npm install playwright >/dev/null 2>&1
  )
fi

if [[ ! -d "${HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1217" ]]; then
  (
    cd "$ROOT_DIR"
    npx playwright install chromium >/dev/null
  )
fi

(
  cd "$ROOT_DIR"
  python3 -m http.server "$PORT" >/tmp/milk-smoke-server.log 2>&1
) &
SERVER_PID=$!

for _ in $(seq 1 20); do
  if curl -sfI "$BASE_URL/" >/dev/null 2>&1; then
    break
  fi
  sleep 0.3
done

if ! curl -sfI "$BASE_URL/" >/dev/null 2>&1; then
  echo "failed to start local server at $BASE_URL" >&2
  exit 1
fi

(
  cd "$TMP_PW_DIR"
  BASE_URL="$BASE_URL" SCREENSHOT_PATH="$SCREENSHOT_PATH" node <<'EOF'
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const checks = [];
  const push = (name, ok, detail = '') => checks.push({ name, ok, detail });
  const baseUrl = process.env.BASE_URL;
  const screenshotPath = process.env.SCREENSHOT_PATH;

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  push('splash visible on first load', await page.locator('#splash-declaration').isVisible(), '');

  for (let i = 0; i < 5; i += 1) {
    await page.click('#splash-next-btn');
    await page.waitForTimeout(120);
  }

  const pledgeText = await page.locator('#splash-pledge-text').innerText();
  await page.fill('#splash-pledge-input', pledgeText);
  await page.click('#splash-enter-btn');
  await page.waitForTimeout(1000);

  const disclaimerVisible = await page.locator('#disclaimer-modal').isVisible().catch(() => false);
  push('disclaimer shown after first entry', disclaimerVisible, '');
  if (disclaimerVisible) {
    await page.click('#accept-disclaimer');
    await page.waitForTimeout(700);
  }

  const tourVisible = await page.locator('#tour-overlay').isVisible().catch(() => false);
  push('tour shown after disclaimer', tourVisible, '');
  if (tourVisible) {
    await page.click('#tour-skip-btn');
    await page.waitForTimeout(1000);
  }

  const dailyVisible = await page.locator('#daily-greeting-modal:not(.hidden)').isVisible().catch(() => false);
  push('daily greeting shown after tour', dailyVisible, '');
  if (dailyVisible) {
    await page.click('.daily-greeting-close-btn');
    await page.waitForTimeout(700);
  }

  push('chat mode button visible', await page.locator('#chat-mode-btn').isVisible(), '');

  await page.click('#chat-mode-btn');
  await page.waitForTimeout(300);
  const chatModeCount = await page.locator('#chat-mode-list [data-session-id]').count();
  push('system chat entry count', chatModeCount === 6, String(chatModeCount));

  const partnerBefore = await page.locator('#partner-name').innerText();
  await page.locator('#chat-mode-list [data-session-id]').nth(1).click();
  await page.waitForTimeout(1600);
  const partnerAfter = await page.locator('#partner-name').innerText();
  push('switch to dm changes header name', partnerBefore !== partnerAfter, `${partnerBefore} -> ${partnerAfter}`);

  const storage = await page.evaluate(async () => ({
    mode: await localforage.getItem('CHAT_APP_V3_chatModeState'),
    sessions: await localforage.getItem('CHAT_APP_V3_sessionList')
  }));
  push('chatModeState stored as dm', storage.mode && storage.mode.mode === 'dm', JSON.stringify(storage.mode));
  push(
    'system session count persisted',
    Array.isArray(storage.sessions) && storage.sessions.filter(session => session.systemChatKey).length === 6,
    String(Array.isArray(storage.sessions) ? storage.sessions.filter(session => session.systemChatKey).length : 'n/a')
  );

  await page.click('#settings-btn');
  await page.waitForTimeout(300);
  const buildVersion = await page.locator('#build-version').innerText();
  const buildTime = await page.locator('#build-time').innerText();
  const updateText = await page.locator('#update-status-text').innerText();
  push('build version displayed', buildVersion === '2026.04.19', buildVersion);
  push('build time displayed', !!buildTime && buildTime !== '-', buildTime);
  push('update status rendered', !!updateText, updateText);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  await browser.close();

  const failed = checks.filter(check => !check.ok);
  console.log(JSON.stringify({ checks, screenshotPath }, null, 2));
  if (failed.length > 0) process.exit(1);
})();
EOF
)
