export function SectionSkeleton() {
  return (
    <div className="section-shell" aria-hidden>
      <div className="container-page space-y-4">
        <div className="mx-auto h-3 w-28 animate-pulse rounded-full bg-ink/10" />
        <div className="mx-auto h-10 w-2/3 max-w-md animate-pulse rounded-2xl bg-ink/10" />
        <div className="mx-auto h-16 w-full max-w-2xl animate-pulse rounded-2xl bg-ink/5" />
      </div>
    </div>
  )
}
