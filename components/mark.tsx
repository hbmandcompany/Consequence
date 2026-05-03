export function Mark({ className }: { className?: string }) {
  // Geometric "C" — a thin engraved monogram, Dutch modernist
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M22.5 11.5C21 9.8 18.7 8.8 16.2 8.8c-4.1 0-7.4 3.2-7.4 7.2s3.3 7.2 7.4 7.2c2.5 0 4.8-1 6.3-2.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.1" fill="currentColor" />
    </svg>
  );
}
