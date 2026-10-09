import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { submitReservation } from '../../api/contact'
import {
  createReservationSchema,
  type ReservationFormValues,
} from '../../lib/formSchemas'

export function ReservationForm() {
  const { t } = useTranslation()
  const [demoMessage, setDemoMessage] = useState<string | null>(null)

  const schema = useMemo(
    () =>
      createReservationSchema({
        required: t('forms.errors.required'),
        email: t('forms.errors.email'),
        phone: t('forms.errors.phone'),
        guests: t('forms.errors.guests'),
        closedDay: t('forms.errors.closedDay'),
        outsideHours: t('forms.errors.outsideHours'),
        pastDate: t('forms.errors.pastDate'),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '12:00',
      guests: 2,
      notes: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitReservation({
      ...values,
      notes: values.notes || undefined,
    })
    setDemoMessage(result.message)
    reset({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '12:00',
      guests: 2,
      notes: '',
    })
  })

  return (
    <form
      onSubmit={onSubmit}
      className="form-card mx-auto w-full max-w-xl space-y-3.5 p-4 sm:p-5"
      noValidate
    >
      <div>
        <h3 className="font-display text-lg text-ink sm:text-xl">
          {t('forms.reservationTitle')}
        </h3>
        <p className="mt-1 text-sm text-ink/70">{t('forms.reservationHelp')}</p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          label={t('forms.name')}
          error={errors.name?.message}
          id="res-name"
        >
          <input
            id="res-name"
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
          id="res-email"
        >
          <input
            id="res-email"
            type="email"
            autoComplete="email"
            placeholder={t('placeholders.email')}
            className="field-input"
            {...register('email')}
          />
        </Field>
        <Field
          label={t('forms.phone')}
          error={errors.phone?.message}
          id="res-phone"
        >
          <input
            id="res-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t('placeholders.phone')}
            className="field-input"
            {...register('phone')}
          />
        </Field>
        <Field
          label={t('forms.guests')}
          error={errors.guests?.message}
          id="res-guests"
        >
          <input
            id="res-guests"
            type="number"
            min={1}
            max={20}
            className="field-input"
            {...register('guests')}
          />
        </Field>
        <Field
          label={t('forms.date')}
          error={errors.date?.message}
          id="res-date"
        >
          <input
            id="res-date"
            type="date"
            className="field-input"
            {...register('date')}
          />
        </Field>
        <Field
          label={t('forms.time')}
          error={errors.time?.message}
          id="res-time"
        >
          <input
            id="res-time"
            type="time"
            className="field-input"
            {...register('time')}
          />
        </Field>
      </div>

      <Field
        label={t('forms.notes')}
        error={errors.notes?.message}
        id="res-notes"
      >
        <textarea
          id="res-notes"
          rows={3}
          placeholder={t('placeholders.notes')}
          className="field-input"
          {...register('notes')}
        />
      </Field>

      <button
        type="submit"
        className="btn-form w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('forms.sending') : t('forms.sendReservation')}
      </button>

      <AnimatePresence>
        {demoMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-xl bg-forest/10 px-3.5 py-2.5 text-sm text-forest"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden />
            <span>
              {demoMessage} — {t('forms.demoHint')}
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
