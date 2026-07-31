type StarProps = {
  className?: string;
};

export default function Star({ className = "brand-star" }: StarProps) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path d="M50 0C54 31 69 46 100 50C69 54 54 69 50 100C46 69 31 54 0 50C31 46 46 54 50 0Z" />
      </svg>
    </span>
  );
}
