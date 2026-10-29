export default function SampleResult() {
  return (
    <figure className="max-w-[640px] lg:max-w-none">
      <figcaption className="mb-3 ml-0.5 text-sm font-medium text-muted">Sample result</figcaption>

      <div className="@container rounded-md border border-line bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_28px_56px_-28px_rgba(20,33,61,0.3)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm font-medium sm:px-5 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-2 text-muted">
            <svg className="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 1.7h5.2L12.3 4.8V14.3H4z" />
              <path d="M9 1.9v3.1h3.1" />
            </svg>
            <span className="truncate">Tenancy agreement, 12 months</span>
          </div>
          <span className="shrink-0 rounded-full bg-mark px-3 py-1.5 font-semibold text-ink">Ask for changes first</span>
        </div>

        <div className="grid gap-6 p-5 sm:p-6">
          <p className="font-medium">
            You’d pay ₦1,200,000 a year. You can leave early, but it could cost you your whole deposit.
          </p>

          <div className="grid items-start gap-3 @[540px]:grid-cols-[minmax(0,1fr)_190px] @[540px]:gap-6">
            <p className="font-serif text-[1.0625rem] leading-[1.65]">
              <span className="mr-2 font-sans text-[0.8125rem] font-medium text-muted">10.2</span>
              If the Tenant ends this Agreement before the end of the Term,{" "}
              <span className="mark-sweep">the caution deposit is forfeited in full.</span>
            </p>
            <p className="note-in-a border-l-2 border-pen pl-3 text-sm leading-normal font-medium text-pen">
              <strong className="font-semibold">Red flag.</strong> You’d lose the whole deposit for leaving early, even if the room is re-let the next day. Ask for a refund minus the landlord’s actual loss.
            </p>
          </div>

          <div className="grid items-start gap-3 @[540px]:grid-cols-[minmax(0,1fr)_190px] @[540px]:gap-6">
            <p className="font-serif text-[1.0625rem] leading-[1.65]">
              <span className="mr-2 font-sans text-[0.8125rem] font-medium text-muted">12.1</span>
              The Tenant shall{" "}
              <span className="underline decoration-pen decoration-2 decoration-dotted underline-offset-4">indemnify</span>{" "}
              the Landlord against all losses arising from the Tenant’s use of the Premises.
            </p>
            <p className="note-in-b border-l-2 border-pen pl-3 text-sm leading-normal font-medium text-pen">
              <strong className="font-semibold">Indemnify</strong> means you pay for the landlord’s losses. Nothing here caps the amount, so ask for a limit.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-field py-2.5 pr-2.5 pl-3.5 text-[0.9375rem]">
            <span>Can the landlord raise the rent mid-year?</span>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pen text-white" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 11.5v-9M3 6.5l4-4 4 4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}