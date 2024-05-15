import Image from 'next/image';

function Logo() {
  return (
    <Image
      height={130}
      width={130}
      src="/logo.svg"
      alt="logo"
    />
  )
}

export default Logo;