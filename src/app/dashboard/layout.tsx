'use client'

import DashboardNavbar from '@/components/DashboardLayout/DashboardNavbar'
import React from 'react'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="relative flex-1 bg-red-600">
      <DashboardNavbar />
      <main className="bg-[#F0F0F0] w-full !text-black font-montserrat p-[.5rem] md:p-[2rem]">
        {children}
      </main>
    </div>
  )
}

export default Layout
