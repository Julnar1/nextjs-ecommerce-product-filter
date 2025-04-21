import React, { Children } from 'react'

export default function Productslayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        {children}
        </div>
  )
}
