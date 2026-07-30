const trophyCursorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
  <text x="16" y="24" font-size="26" text-anchor="middle">🏆</text>
</svg>
`.trim()

export const TROPHY_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(trophyCursorSvg)}") 5 21, auto`
