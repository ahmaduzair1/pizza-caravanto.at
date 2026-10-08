import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { submitContact } from '../../api/contact'
import {
  createContactSchema,
  type ContactFormValues,
} from '../../lib/formSchemas'

export function ContactForm() {
  const { t } = useTranslation()
  const [demoMessage, setDemoMessage] = useState<string | null>(null)

  const schema = useMemo(
    () =>
      createContactSchema({
        required: t('forms.errors.required'),
        email: t('forms.errors.email'),
        minMessage: t('forms.errors.minMessage'),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitContact(values)
    setDemoMessage(result.message)
    reset()
  })

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-ink/10 bg-ivory p-5 shadow-card sm:p-6"
      noValidate
    >
      <h3 className="font-display text-xl text-ink">
        {t('forms.contactTitle')}
      </h3>

      <Field
        label={t('forms.name')}
        error={errors.name?.message}
        id="contact-name"
      >
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className="field-input"
          {...register('name')}
        />
      </Field>

      <Field
        label={t('forms.email')}
        error={errors.email?.message}
        id="contact-email"
      >
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="field-input"
          {...register('email')}
        />
      </Field>

      <Field
        label={t('forms.phoneOptional')}
        error={errors.phone?.message}
        id="contact-phone"
      >
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className="field-input"
          {...register('phone')}
        />
      </Field>

      <Field
        label={t('forms.message')}
        error={errors.message?.message}
        id="contact-message"
      >
        <textarea
          id="contact-message"
          rows={4}
          className="field-input resize-y"
          {...register('message')}
        />
      </Field>

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('forms.sending') : t('forms.sendMessage')}
      </button>

      <AnimatePresence>
        {demoMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-2xl bg-forest/10 px-4 py-3 text-sm text-forest"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden />
            <span>
              {demoMessage}
              {isSubmitSuccessful ? ` — ${t('forms.demoHint')}` : null}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
