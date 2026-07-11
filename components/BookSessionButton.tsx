import Link from 'next/link';

interface BookSessionButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BookSessionButton({
  className,
  children = 'Book a Session',
  onClick,
}: BookSessionButtonProps) {
  return (
    <Link href="/contact" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
