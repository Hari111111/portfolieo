import { getImgPath } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={getImgPath("/images/logo/logo-white.png")}
        alt="logo"
        width={120}
        height={40}
        className="dark:hidden h-10 w-auto"
        priority
      />
      <Image
        src={getImgPath("/images/logo/logo-white.png")}
        alt="logo"
        width={120}
        height={40}
        className="hidden dark:block h-10 w-auto"
        priority
      />
    </Link>
  );
}
