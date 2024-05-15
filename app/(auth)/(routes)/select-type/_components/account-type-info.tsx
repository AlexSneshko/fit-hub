//"use client"

import Link from "next/link"

interface AccountTypeInfoProps {
    //onClick: () => {},
    label: string,
    description: string
}

export const AccountTypeInfo = ({
    //onClick,
    label,
    description
}: AccountTypeInfoProps) => {
  return (
    <Link className="w-min" href="/">
        <div className="flex flex-col rounded-md shadow-md p-4 text-center w-80 h-auto hover:shadow-lg transition">
            <h2 className="font-medium text-2xl">{label}</h2>
            <p className="mt-4">{description}</p>
        </div>
    </Link>
  )
}
