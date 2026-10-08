import { useCallback, useEffect, useState } from 'react'

import {
  acceptAllConsent,
  defaultConsent,
  readConsent,
  rejectOptionalConsent,
  type ConsentPreferences,
  writeConsent,
} from '../lib/consent'

export function useConsent() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
    setReady(true)

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentPreferences>).detail
      setConsent(detail)
    }
    window.addEventListener('caravento:consent', onChange)
    return () => window.removeEventListener('caravento:consent', onChange)
  }, [])

  const save = useCallback(
    (prefs: { analytics: boolean; marketing: boolean; map: boolean }) => {
      setConsent(writeConsent(prefs))
    },
    [],
  )

  const acceptAll = useCallback(() => {
    setConsent(acceptAllConsent())
  }, [])

  const rejectOptional = useCallback(() => {
    setConsent(rejectOptionalConsent())
  }, [])

  const allowMap = useCallback(() => {
    const current = readConsent() ?? defaultConsent
    setConsent(
      writeConsent({
        analytics: current.analytics,
        marketing: current.marketing,
        map: true,
      }),
    )
  }, [])

  return {
    consent,
    ready,
    hasDecided: consent !== null,
    save,
    acceptAll,
    rejectOptional,
    allowMap,
  }
}
