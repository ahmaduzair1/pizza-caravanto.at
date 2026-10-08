import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-2xl focus:bg-terracotta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-soft"
    >
      {t('common.skipToContent')}
    </a>
  )
}
