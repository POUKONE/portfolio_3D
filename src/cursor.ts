const ballCursorSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 44 44">
  <defs>
    <radialGradient id="ball" cx="0.35" cy="0.32" r="0.85">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.6" stop-color="#f2f4f2"/>
      <stop offset="1" stop-color="#c7cbc7"/>
    </radialGradient>
    <filter id="drop" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.4" flood-color="#0a1f10" flood-opacity="0.55"/>
    </filter>
  </defs>

  <ellipse cx="22" cy="37" rx="10" ry="2.6" fill="#123a20" opacity="0.4"/>

  <g filter="url(#drop)">
    <circle cx="22" cy="20" r="15.5" fill="url(#ball)" stroke="#9aa09a" stroke-width="1"/>
    <ellipse cx="16" cy="14" rx="4.6" ry="3" fill="#ffffff" opacity="0.8"/>

    <g stroke="#171a17" stroke-width="1.1" stroke-linecap="round" fill="none">
      <path d="M22 13.8 L22 6.3"/>
      <path d="M26.95 17.4 L34.4 13.5"/>
      <path d="M25.06 23.2 L31.7 30.1"/>
      <path d="M18.94 23.2 L12.3 30.1"/>
      <path d="M17.05 17.4 L9.6 13.5"/>
    </g>

    <path d="M22 13.8 L26.95 17.4 L25.06 23.2 L18.94 23.2 L17.05 17.4 Z" fill="#171a17"/>

    <path d="M34.7 12.4 L37.2 15.4 L33 17.6 Z" fill="#171a17"/>
    <path d="M11.5 31.6 L15.6 32.8 L13.3 28.4 Z" fill="#171a17"/>

    <circle cx="22" cy="20" r="15.5" fill="none" stroke="#171a17" stroke-width="0.5" opacity="0.3"/>
  </g>
</svg>
`.trim()

export const BALL_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(ballCursorSvg)}") 13 12, auto`
