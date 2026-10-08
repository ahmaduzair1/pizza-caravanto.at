import { useTranslation } from 'react-i18next'

type Variant = 'light' | 'dark' | 'overHero'

interface LanguageSwitcherProps {
  variant?: Variant
}

export function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const current = i18n.language.startsWith('en') ? 'en' : 'de'
  const onDark = variant === 'dark' || variant === 'overHero'

  const shell = onDark
    ? 'border-ivory/40 bg-transparent text-ivory'
    : 'border-ink/10 bg-ivory/80 text-ink'

  const active = onDark ? 'bg-ivory text-forest' : 'bg-ink text-ivory'
  const idle = onDark
    ? 'text-ivory/85 hover:text-ivory'
    : 'text-ink/70 hover:text-ink'

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-2xl border p-1 text-xs font-semibold ${shell}`}
      role="group"
      aria-label={t('nav.language')}
    >
      <button
        type="button"
        className={`rounded-xl px-2.5 py-1.5 transition ${
          current === 'de' ? active : idle
        }`}
        onClick={() => void i18n.changeLanguage('de')}
        aria-pressed={current === 'de'}
      >
        DE
      </button>
      <button
        type="button"
        className={`rounded-xl px-2.5 py-1.5 transition ${
          current === 'en' ? active : idle
        }`}
        onClick={() => void i18n.changeLanguage('en')}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  )
}
