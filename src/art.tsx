// Оригинальные SVG-иллюстрации в стиле глянцевого 3D: градиенты, блики, мягкая тень.
let uid = 0
const id = (p: string) => `${p}${uid++}`

export function Brain({ size = 220, className = 'float' }: { size?: number; className?: string }) {
  const [a, b] = [id('ba'), id('bb')]
  return (
    <svg viewBox="0 0 240 220" width={size} height={(size * 220) / 240} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={a} cx=".3" cy=".25" r=".9">
          <stop offset="0" stopColor="#D9C9F7" /><stop offset=".5" stopColor="#8055E8" /><stop offset="1" stopColor="#3F1FA0" />
        </radialGradient>
        <radialGradient id={b} cx=".3" cy=".25" r=".9">
          <stop offset="0" stopColor="#FFE08A" /><stop offset=".5" stopColor="#FF713D" /><stop offset="1" stopColor="#B83A12" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="208" rx="74" ry="9" fill="#090909" opacity=".2" />
      <path d="M120 28C84 6 28 26 34 76C12 100 22 142 56 152C60 184 102 198 120 176Z" fill={`url(#${a})`} stroke="#090909" strokeWidth="5" strokeLinejoin="round" />
      <path d="M120 28C156 6 212 26 206 76C228 100 218 142 184 152C180 184 138 198 120 176Z" fill={`url(#${b})`} stroke="#090909" strokeWidth="5" strokeLinejoin="round" />
      <g fill="none" stroke="#090909" strokeWidth="4" strokeLinecap="round" opacity=".55">
        <path d="M52 74C66 62 82 70 86 84" /><path d="M48 118C64 108 84 114 90 128" />
        <path d="M188 74C174 62 158 70 154 84" /><path d="M192 118C176 108 156 114 150 128" />
      </g>
      <ellipse cx="68" cy="52" rx="20" ry="9" fill="#fff" opacity=".55" transform="rotate(-25 68 52)" />
      <ellipse cx="176" cy="50" rx="14" ry="7" fill="#fff" opacity=".5" transform="rotate(25 176 50)" />
      {/* глаза: делают мозг персонажем */}
      <circle cx="98" cy="112" r="17" fill="#fff" stroke="#090909" strokeWidth="4" />
      <circle cx="142" cy="112" r="17" fill="#fff" stroke="#090909" strokeWidth="4" />
      <circle cx="103" cy="114" r="7" fill="#090909" /><circle cx="147" cy="114" r="7" fill="#090909" />
      <path d="M104 146Q120 158 136 146" fill="none" stroke="#090909" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function Cube({ size = 110, top = '#FFD84D', left = '#8055E8', right = '#FF713D', mark = '?', className = 'float2' }:
  { size?: number; top?: string; left?: string; right?: string; mark?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 130" width={size} height={(size * 130) / 120} className={className} aria-hidden="true">
      <ellipse cx="60" cy="124" rx="40" ry="6" fill="#090909" opacity=".2" />
      <g stroke="#090909" strokeWidth="4" strokeLinejoin="round">
        <polygon points="60,8 112,36 60,64 8,36" fill={top} />
        <polygon points="8,36 60,64 60,118 8,90" fill={left} />
        <polygon points="112,36 60,64 60,118 112,90" fill={right} />
      </g>
      <polygon points="60,16 96,36 60,50 26,36" fill="#fff" opacity=".35" />
      <text x="34" y="96" fontFamily="Anton, Impact, sans-serif" fontSize="34" fill="#fff" stroke="#090909" strokeWidth="1.5" transform="skewY(27) translate(0 -20)">{mark}</text>
    </svg>
  )
}

export function Sphere({ size = 80, color = '#FFD84D', className = 'float' }: { size?: number; color?: string; className?: string }) {
  const g = id('sp')
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={g} cx=".32" cy=".28" r=".85">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".25" stopColor={color} /><stop offset="1" stopColor="#090909" stopOpacity=".55" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill={color} stroke="#090909" strokeWidth="4" />
      <circle cx="50" cy="50" r="44" fill={`url(#${g})`} />
      <ellipse cx="34" cy="28" rx="12" ry="7" fill="#fff" opacity=".7" transform="rotate(-35 34 28)" />
    </svg>
  )
}

export function Trophy({ size = 120, className = 'float2' }: { size?: number; className?: string }) {
  const g = id('tr')
  return (
    <svg viewBox="0 0 120 130" width={size} height={(size * 130) / 120} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor="#FFF1A8" /><stop offset=".45" stopColor="#FFD84D" /><stop offset="1" stopColor="#E08A00" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="124" rx="38" ry="6" fill="#090909" opacity=".2" />
      <g stroke="#090909" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 22C6 22 6 58 36 60M90 22C114 22 114 58 84 60" fill="none" />
        <path d="M28 12H92V40C92 68 76 80 60 80C44 80 28 68 28 40Z" fill={`url(#${g})`} />
        <rect x="52" y="80" width="16" height="18" fill="#FF713D" />
        <rect x="32" y="98" width="56" height="20" rx="6" fill="#090909" />
      </g>
      <path d="M38 20V40C38 54 44 62 50 66" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
    </svg>
  )
}

/** Объёмная цифра: выдавленный текст из слоёв тени */
export function Num3D({ children }: { children: React.ReactNode }) {
  return <span className="num3d">{children}</span>
}
