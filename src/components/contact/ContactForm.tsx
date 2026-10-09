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
      className="form-card mx-auto w-full max-w-xl space-y-3.5 p-4 sm:p-5"
      noValidate
    >
      <h3 className="font-display text-lg text-ink sm:text-xl">
        {t('forms.contactTitle')}
      </h3>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          label={t('forms.name')}
          error={errors.name?.message}
          id="contact-name"
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t('placeholders.name')}
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
            placeholder={t('placeholders.email')}
            className="field-input"
            {...register('email')}
          />
        </Field>
      </div>

      <Field
        label={t('forms.phoneOptional')}
        error={errors.phone?.message}
        id="contact-phone"
      >
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder={t('placeholders.phone')}
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
          placeholder={t('placeholders.message')}
          className="field-input"
          {...register('message')}
        />
      </Field>

      <button
        type="submit"
        className="btn-form w-full sm:w-auto"
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
            className="flex items-start gap-2 rounded-xl bg-forest/10 px-3.5 py-2.5 text-sm text-forest"
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
    <div className="space-y-1">
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
