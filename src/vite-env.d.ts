/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ORDER_URL: string
  readonly VITE_ORDER_URL_IOS: string
  readonly VITE_ORDER_URL_ANDROID: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_PHONE_DISPLAY: string
  readonly VITE_CONTACT_PHONE_SECONDARY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
