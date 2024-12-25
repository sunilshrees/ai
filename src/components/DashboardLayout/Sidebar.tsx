'use client'

import { cn } from '@/utils/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
// import { SidebarItems } from './NavItem'
import Image from 'next/image'
import Logo from '../../../public/images/logo.png'
import useGlobalStore from '@/store/global-store'

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

const Sidebar = ({ collapsed, toggleCollapsed, isMobile }: any) => {
  const router = useRouter()

  const store = useGlobalStore((state: any) => state)

  const isOpen = useMemo(() => store?.isOpen, [store])

  type MenuItem = Required<MenuProps>['items'][number]

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: (
        <img
          src="/icons/home.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'hero-section', label: 'Hero Section' },
        { key: 'company-intro', label: 'Company Intro' },
        { key: 'client-brand-logo', label: 'Client Logos' },
      ],
    },
    {
      key: 'about-us',
      label: 'About US',
      icon: (
        <img
          src="/icons/about.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'company-overview', label: 'Company Overview' },
        { key: 'leadership-team', label: 'Leadership Team' },
        // { key: 'company-culture', label: 'Company Culture' },
      ],
    },
    {
      key: 'services',
      label: 'Services',
      icon: (
        <img
          src="/icons/services.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
    },
    {
      key: 'products',
      label: 'Products',
      icon: (
        <img
          src="/icons/products.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'create-product', label: 'Create Product' },
        { key: 'product-demo', label: 'Product Demos' },
      ],
    },
    {
      key: 'industries',
      label: 'Industries',
      icon: (
        <img
          src="/icons/industries.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [{ key: 'sector-focus', label: 'Sector Focus' }],
    },
    {
      key: 'case-studies',
      label: 'Case Studies',
      icon: (
        <img
          src="/icons/case-studies.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [{ key: 'success-stories', label: 'Success Stories' }],
    },
    {
      key: 'insights',
      label: 'Insights & Resources',
      icon: (
        <img
          src="/icons/insights.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'blog', label: 'Blog' },
        { key: 'e-books', label: 'Whitepapers & E-books' },
        { key: 'events', label: 'Webinars & Events' },
        { key: 'events-images', label: 'Events Images' },
      ],
    },
    {
      key: 'careers',
      label: 'Careers',
      icon: (
        <img
          src="/icons/careers.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'career-overview', label: 'Career Overview' },
        { key: 'job', label: 'Job' },
        { key: 'employee-stories', label: 'Employee Stories' },
      ],
    },
    {
      key: 'contact-us',
      label: 'Contact Us',
      icon: (
        <img
          src="/icons/contact.svg"
          alt="icon"
          style={{ width: 20, height: 20, marginBottom: 4 }}
        />
      ),
      children: [
        { key: 'contact-info', label: 'Contact information' },
        { key: 'inquiry', label: 'Inquiry' },
        { key: 'faq', label: 'FAQ' },
        { key: 'tou', label: 'ToU & Privacy Policy' },
      ],
    },
  ]

  const handleClick = (e: any) => {
    const { key, keyPath } = e
    if (isMobile) {
      store.add('isOpen', false)
    }
    router.push(`/dashboard/${keyPath?.reverse()?.join('/')}`)
  }

  return (
    <div
      className={cn(
        'fixed left-0 w-[16rem] h-[100svh] md:h-screen overflow-scroll   z-[2000]  text-white bg-[#161615] transition-all duration-200 ease-in-out',
        { 'w-[80px]': collapsed, '-left-[16rem]': !isOpen && !collapsed },
      )}
    >
      <div className={`relative w-full h-full flex flex-col justify-between `}>
        <div className="sticky top-0 w-full py-[1.35rem] flex justify-center items-center bg-[#161615] z-50 ">
          <div className="flex items-center gap-[0.5rem]">
            <div className="w-[35px] h-[35px] relative overflow-hidden !z-20 cursor-pointer">
              <Image
                src={'/images/logo.svg'}
                alt="logo"
                fill
                className="w-full h-full object-cover object-center aspect-video"
              />
            </div>
            {!collapsed && <div>Catech.Ai</div>}
          </div>
        </div>

        <div className=" pl-0 py-4 flex-1">
          <Menu
            defaultSelectedKeys={['hero-section']}
            defaultOpenKeys={['home']}
            mode="inline"
            // theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={handleClick}
          />
        </div>
        <div
          className="sticky bottom-0 w-full h-[3rem] border-t-white border-t hidden lg:flex justify-center items-center text-[1rem] py-4 cursor-pointer hover:text-primary bg-[#161615]"
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <i className="bx bxs-chevrons-right"></i>
          ) : (
            <i className="bx bxs-chevrons-left"></i>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
