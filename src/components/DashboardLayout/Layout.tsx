'use client'

import useGlobalStore from '@/store/global-store'
import { cn } from '@/utils/utils'
import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import ModalWrapperLayout from '../Modal/ModalWrapper'
import Footer from './Footer'
import Navbar from './Navbar'
import localFont from 'next/font/local'
import { Suspense, useEffect, useMemo } from 'react'
import React, { useState } from 'react'

import Image from 'next/image'
import Sidebar from './Sidebar'
import SplashScreen from '../SplashScreen'

const ClashDisplay = localFont({
  src: [
    {
      path: '../../../public/fonts/ClashDisplay-Bold.otf',
      weight: '700',
    },
    {
      path: '../../../public/fonts/ClashDisplay-Semibold.otf',
      weight: '600',
    },
    {
      path: '../../../public/fonts/ClashDisplay-Medium.otf',
      weight: '500',
    },
    {
      path: '../../../public/fonts/ClashDisplay-Regular.otf',
      weight: '400',
    },
  ],
  variable: '--font-clash-display',
})

const DashboardLayout = ({ footerData, children }: any) => {
  const store = useGlobalStore((state: any) => state)

  const isOpen = useMemo(() => store?.isOpen, [store])

  const path = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  const [isMobile, setIsMobile] = useState(false)

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  function handleResize() {
    if (innerWidth <= 1024) {
      setIsMobile(true)
      // setCollapsed(true)
    } else {
      setIsMobile(false)
      // setCollapsed(false)
      store.add('isOpen', true)
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      handleResize()
    }
    if (typeof window != undefined) {
      addEventListener('resize', handleResize)
    }
    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  const hideNavPaths = ['/login']

  const isNavHidden = useMemo(() => hideNavPaths.includes(path), [path])

  const isSecuredPage = useMemo(() => path?.includes('/dashboard'), [path])

  const isHome = path === '/'
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      return
    }
  }, [isLoading])

  return (
    <html lang="en" className={`${ClashDisplay.variable}`}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        <title>AI. Project</title>
      </head>
      <body suppressHydrationWarning={true}>
        <Toaster
          richColors
          duration={3000}
          position="top-right"
          className="toast-sonner-position"
          closeButton={true}
          style={{ zIndex: 2147483647 }}
        />

        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
          <>
            {!isNavHidden && !isSecuredPage && <Navbar />}
            <main
              className={cn('bg-primary-bg-color ', {
                'flex relative ': isSecuredPage,
              })}
            >
              {!isNavHidden && isSecuredPage && (
                <Sidebar
                  collapsed={collapsed}
                  toggleCollapsed={toggleCollapsed}
                  isMobile={isMobile}
                />
              )}
              <div
                className={cn('w-full', {
                  'ml-[16rem] ': isSecuredPage && !isMobile,
                  'ml-[80px] ': collapsed && isSecuredPage,
                  'ml-0': !isOpen && isSecuredPage,
                })}
              >
                {children}
              </div>
            </main>
            {!isNavHidden && !isSecuredPage && (
              <Footer footerData={footerData} />
            )}
          </>
        )}
        <ModalWrapperLayout />
      </body>
    </html>
  )
}

export default DashboardLayout
