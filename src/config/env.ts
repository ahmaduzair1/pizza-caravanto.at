const fallbackOrder =
  'https://play.google.com/store/apps/details?id=com.restajet.caravento'

export const env = {
  orderUrl: import.meta.env.VITE_ORDER_URL ?? fallbackOrder,
  orderUrlIos:
    import.meta.env.VITE_ORDER_URL_IOS ??
    'https://apps.apple.com/de/app/pizza-caravento-restaurant/id6788725934',
  orderUrlAndroid:
    import.meta.env.VITE_ORDER_URL_ANDROID ?? fallbackOrder,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? 'zaher756@hotmail.com',
  contactPhone: import.meta.env.VITE_CONTACT_PHONE ?? '+436641981965',
  contactPhoneDisplay:
    import.meta.env.VITE_CONTACT_PHONE_DISPLAY ?? '0664 198 1965',
  contactPhoneSecondary:
    import.meta.env.VITE_CONTACT_PHONE_SECONDARY ?? '07236 879 24',
} as const
