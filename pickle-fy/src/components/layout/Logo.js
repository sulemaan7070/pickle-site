import Image from 'next/image';

/** The Pickle-Fy logo. `className` sets its height (e.g. "h-10"). */
export default function Logo({ className = 'h-10' }) {
  return (
    <a href="#" aria-label="Pickle-Fy home" className="flex items-center">
      <Image src="/images/logo.png" alt="Pickle-Fy" width={640} height={192} priority className={`${className} block w-auto`} />
    </a>
  );
}
