// Brand mark: the sawn end of a log — growth rings, a drying check, and the
// dab of vermilion paint a mill uses to mark its timber.
export function LogMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" strokeWidth="2.4" />
      <path
        d="M31.2 21.6c-.7 5.6-5.4 9.9-11.2 9.9-6.2 0-11.3-5.1-11.3-11.3 0-5.3 3.7-9.8 8.7-11"
        strokeWidth="1.5"
      />
      <path
        d="M25.6 18.3c.2.6.3 1.3.3 2 0 3.5-2.8 6.3-6.3 6.3s-6.3-2.8-6.3-6.3 2.8-6.3 6.3-6.3"
        strokeWidth="1.5"
      />
      <path d="M22 18.5 34.5 11" strokeWidth="1.5" />
      <circle
        cx="19.5"
        cy="20.5"
        r="2.6"
        fill="var(--color-vermilion)"
        stroke="none"
      />
    </svg>
  );
}
