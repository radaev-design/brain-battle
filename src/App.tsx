import { useEffect, useRef, useState } from 'react'
import { Brain, Cube, Num3D, Sphere, Trophy } from './art'

type Screen = 'home' | 'categories' | 'leaderboard' | 'profile' | 'settings'

const PLAYER = { name: 'Игрок', level: 7, xp: 340, xpMax: 500, elo: 1200, wins: 18, losses: 9, streak: 3 }

const NAV: { id: Screen; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'categories', label: 'Темы' },
  { id: 'leaderboard', label: 'Рейтинг' },
  { id: 'profile', label: 'Профиль' },
  { id: 'settings', label: 'Настройки' },
]

const CATEGORIES = [
  { name: 'Logic', ru: 'Логика', cls: 'p', mark: '?' },
  { name: 'Mathematics', ru: 'Математика', cls: 'y', mark: '∑' },
  { name: 'Science', ru: 'Наука', cls: 'o', mark: 'H₂' },
  { name: 'History', ru: 'История', cls: 'k', mark: '1453' },
  { name: 'Geography', ru: 'География', cls: 's', mark: 'N' },
  { name: 'Technology', ru: 'Технологии', cls: 'p', mark: '</>' },
  { name: 'Movies', ru: 'Кино', cls: 'y', mark: '24' },
  { name: 'Music', ru: 'Музыка', cls: 'o', mark: '♪' },
  { name: 'General', ru: 'Общие знания', cls: 'w', mark: '+' },
]
const CAT_COLORS: Record<string, string> = { p: '#8055E8', y: '#FFD84D', o: '#FF713D', k: '#090909', s: '#D9C9F7', w: '#FFFFFF' }

const TOP = [
  ['NeuroKnight', 2410], ['QuizFox', 2288], ['Mathilda', 2190], ['Pixel', 2051], ['Sokol', 1977], ['Игрок', 1200],
] as const

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [toast, setToast] = useState<string | null>(null)
  const [sound, setSound] = useState(true)
  const [motion, setMotion] = useState(true)
  const timer = useRef<number>()

  const soon = (what: string) => {
    setToast(`${what} — откроется в следующей фазе`)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 2200)
  }

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off'
  }, [motion])

  useEffect(() => window.scrollTo(0, 0), [screen])

  return (
    <>
      <div className="shell">
        <Header onProfile={() => setScreen('profile')} />
        <main key={screen} className="screen">
          {screen === 'home' && <Home soon={soon} go={setScreen} />}
          {screen === 'categories' && <Categories soon={soon} />}
          {screen === 'leaderboard' && <Leaderboard />}
          {screen === 'profile' && <Profile />}
          {screen === 'settings' && <Settings sound={sound} setSound={setSound} motion={motion} setMotion={setMotion} />}
        </main>
        <Ticker />
      </div>
      <nav className="nav" aria-label="Навигация">
        {NAV.map((n) => (
          <button key={n.id} className={'pill' + (screen === n.id ? ' on' : '')} onClick={() => setScreen(n.id)} aria-current={screen === n.id}>
            {n.label}
          </button>
        ))}
      </nav>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}

function Header({ onProfile }: { onProfile: () => void }) {
  const pct = Math.round((PLAYER.xp / PLAYER.xpMax) * 100)
  return (
    <header className="cell w head">
      <div className="logo">BRAIN<br />BATTLE</div>
      <button className="me" onClick={onProfile} aria-label="Открыть профиль">
        <span className="ava">{PLAYER.name[0]}</span>
        <span className="me-t">
          <b>Ур. {PLAYER.level}</b>
          <span className="bar"><i style={{ width: pct + '%' }} /></span>
          <small>{PLAYER.xp}/{PLAYER.xpMax} XP</small>
        </span>
      </button>
    </header>
  )
}

function Home({ soon, go }: { soon: (s: string) => void; go: (s: Screen) => void }) {
  return (
    <section className="bento">
      <article className="cell y hero">
        <h1 className="display">QUICK<br />BATTLE</h1>
        <p>Дуэль 1 на 1. Пять вопросов, побеждает самый быстрый.</p>
        <button className="btn" onClick={() => soon('Quick Battle')}>Играть ↗</button>
        <div className="hero-art"><Brain size={250} /><Sphere size={70} color="#8055E8" className="float2 s1" /><Cube size={74} className="float s2" /></div>
      </article>

      <Mode cls="p" title="BLITZ" desc="10 вопросов на время" onClick={() => soon('Blitz')} art={<Cube size={84} top="#FFD84D" left="#D9C9F7" right="#FF713D" mark="10" />} />
      <Mode cls="k" title="SURVIVAL" desc="Играй до первой ошибки" onClick={() => soon('Survival')} art={<Sphere size={84} color="#FF713D" />} />

      <article className="cell o daily">
        <span className="tag">Каждый день</span>
        <h2 className="display">DAILY<br />CHALLENGE</h2>
        <p>Одно испытание. Серия: <b>{PLAYER.streak} дня</b></p>
        <button className="btn k" onClick={() => soon('Daily Challenge')}>Начать ↗</button>
      </article>

      <Mode cls="w" title="FRIENDS" desc="Позови друга по ссылке" onClick={() => soon('Приглашение друзей')} art={<Sphere size={76} color="#8055E8" />} />

      <button className="cell s rank" onClick={() => go('leaderboard')}>
        <span className="tag">Твой ELO</span>
        <Num3D>{PLAYER.elo}</Num3D>
        <small>Рейтинг ↗</small>
      </button>

      <button className="cell w ach" onClick={() => soon('Достижения')}>
        <Trophy size={92} />
        <span><h2 className="display sm">ДОСТИЖЕНИЯ</h2><small>2 из 24 открыто</small></span>
        <i className="arr">↗</i>
      </button>

      <div className="cell s tour">
        <span className="stamp">СКОРО</span>
        <h2 className="display sm">TOURNAMENT</h2>
        <small>Турнирная сетка и призы</small>
      </div>
    </section>
  )
}

function Mode({ cls, title, desc, onClick, art }: { cls: string; title: string; desc: string; onClick: () => void; art: React.ReactNode }) {
  return (
    <button className={`cell ${cls} mode`} onClick={onClick}>
      <i className="arr">↗</i>
      <h2 className="display sm">{title}</h2>
      <small>{desc}</small>
      <span className="mode-art">{art}</span>
    </button>
  )
}

function Categories({ soon }: { soon: (s: string) => void }) {
  return (
    <section>
      <h1 className="display big">ТЕМЫ</h1>
      <div className="bento cats">
        {CATEGORIES.map((c, i) => (
          <button key={c.name} className={`cell ${c.cls} cat ${i % 4 === 0 ? 'wide' : ''}`} onClick={() => soon(c.ru)}>
            <h2 className="display sm">{c.name.toUpperCase()}</h2>
            <small>{c.ru}</small>
            <span className="cat-mark" style={{ color: ['k', 'p'].includes(c.cls) ? CAT_COLORS.y : CAT_COLORS.k }}>{c.mark}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Leaderboard() {
  const [tab, setTab] = useState<'global' | 'week'>('global')
  const rows: (readonly [string, number])[] = tab === 'global' ? [...TOP] : TOP.map(([n, v]) => [n, Math.round(v / 7)] as const)
  return (
    <section>
      <h1 className="display big">РЕЙТИНГ</h1>
      <div className="tabs">
        <button className={'pill' + (tab === 'global' ? ' on' : '')} onClick={() => setTab('global')}>Глобальный</button>
        <button className={'pill' + (tab === 'week' ? ' on' : '')} onClick={() => setTab('week')}>Неделя</button>
      </div>
      <div className="list">
        {rows.map(([n, v], i) => (
          <div key={n} className={'cell row ' + (n === 'Игрок' ? 'y' : 'w')}>
            <b className="display">{i + 1}</b><span>{n}</span><em>{v}</em>
          </div>
        ))}
      </div>
      <p className="note">Демо-данные. Реальный рейтинг подключим в Phase 5.</p>
    </section>
  )
}

function Profile() {
  const stats: [string, string | number][] = [['ELO', PLAYER.elo], ['Победы', PLAYER.wins], ['Поражения', PLAYER.losses], ['Серия', PLAYER.streak]]
  return (
    <section>
      <h1 className="display big">ПРОФИЛЬ</h1>
      <div className="bento">
        <div className="cell p wide prof">
          <span className="ava lg">{PLAYER.name[0]}</span>
          <div><h2 className="display sm">{PLAYER.name}</h2><small>Уровень {PLAYER.level} · {PLAYER.xp}/{PLAYER.xpMax} XP</small></div>
        </div>
        {stats.map(([k, v], i) => (
          <div key={k} className={`cell ${['y', 'w', 'o', 's'][i]} stat`}><small>{k}</small><Num3D>{v}</Num3D></div>
        ))}
        <div className="cell w wide"><small>История игр и достижения появятся в Phase 5.</small></div>
      </div>
    </section>
  )
}

function Settings(p: { sound: boolean; setSound: (v: boolean) => void; motion: boolean; setMotion: (v: boolean) => void }) {
  return (
    <section>
      <h1 className="display big">НАСТРОЙКИ</h1>
      <div className="list">
        <Toggle label="Звук" on={p.sound} set={p.setSound} />
        <Toggle label="Анимации" on={p.motion} set={p.setMotion} />
      </div>
    </section>
  )
}

function Toggle({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <button className="cell w row tgl" role="switch" aria-checked={on} onClick={() => set(!on)}>
      <span>{label}</span><span className={'sw' + (on ? ' on' : '')}><i /></span>
    </button>
  )
}

function Ticker() {
  const items = ['QUICK BATTLE', 'BLITZ', 'SURVIVAL', 'DAILY CHALLENGE', 'FRIENDS', 'TOURNAMENT']
  const line = items.map((t) => <span key={t}>{t}<i>●</i></span>)
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-in">{line}{line}</div>
    </div>
  )
}
