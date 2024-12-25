import React from 'react'
import { FooterMenu, FooterMenu2 } from '@/constants/Footer'
import Link from 'next/link'
import { API_URLS } from '@/constants/ApiRoutes'
import SocialItem from '../SocialItem'

const Footer = ({ footerData }: any) => {
  const { data, socialData, serviceData } = footerData
  return (
    <footer className="w-full h-full service-background py-[20px] text-white ">
      <div className="max-w-screen-ml 2xl:max-w-screen-xl   w-full h-full mx-auto text-[16px] leading-[27px] px-4 lg:px-0 relative ">
        <div
          className="border grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0  place-content-center place-items-center md:px-[1.25rem] py-[1.875rem] z-50"
          style={{
            borderRadius: '10px',
            border: '1px solid #126106',
            background: 'black',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="text-4 font-bold mb-4">Company</div>
            {FooterMenu.map((item: any, index: number) => (
              <Link href={item.url} key={index}>
                <div className="whitespace-nowrap font-normal text-[.875rem]">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col h-full">
            <div className="text-4 font-bold mb-4">Resources</div>
            {FooterMenu2.map((item: any, index: number) => (
              <Link href={item.url} key={index}>
                <div className="whitespace-nowrap font-normal text-[.875rem]">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          {serviceData && serviceData?.length > 0 && (
            <div className="flex flex-col h-full">
              <div className="text-4 font-bold mb-4">Services</div>
              {serviceData?.slice(0, 5)?.map((item: any, index: number) => (
                <Link href={`/services?selected=${item?.id}`} key={index}>
                  <div
                    className="whitespace-nowrap font-normal text-[.875rem]"
                    key={index}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col h-full">
            <div className="text-4 font-bold mb-4">Contact</div>
            <div className="flex flex-col">
              <div className="flex gap-2 mb-1">
                <h1>{data?.phone ?? '-'}</h1>
              </div>
              <div className="flex gap-2 mb-1">
                <h1>{data?.email ?? '-'}</h1>
              </div>
              <div className="flex gap-2 mb-1">
                <h1>{data?.address ?? '-'}</h1>
              </div>
            </div>
            <div>
              <h1 className="font-semibold">Social Links</h1>
              <div className="flex gap-x-[10px] pt-2">
                {socialData?.map((sL: any) => (
                  <SocialItem data={sL} key={sL.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-[0.625rem] text-[0.75rem]">
          <div>Copyright © {new Date().getFullYear()}</div>
          <Link href={'/tou'}>
            <span>Terms of Use</span> & Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
