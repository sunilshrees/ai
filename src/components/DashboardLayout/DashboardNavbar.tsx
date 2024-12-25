'use client'

import { openModal } from '@/utils/openModal'
import { Button } from '../ButtonComponent'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Menu } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PasswordIcon from '@mui/icons-material/Password'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useGlobalStore from '@/store/global-store'
import Logo from '../../../public/images/logo.png'
import Image from 'next/image'
import apiHandler from '@/utils/apiHandler'
import { API_URLS } from '@/constants/ApiRoutes'
import { cn } from '@/utils/utils'

const DashboardNavbar = () => {
  const store = useGlobalStore((state: any) => state)

  const isOpen = useMemo(() => store?.isOpen, [store])

  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
      })
      if (response.ok) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        sessionStorage.clear()
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  const handleClick = () => {
    openModal(
      ConfirmationModal,
      null,
      {
        height: '',
        width: '372px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      handleLogout,

      {
        heading: 'Confirm Logout',
        title: 'Are you sure you want to logout ?',
        approveText: 'Yes',
      },
    )
  }

  return (
    <div className="h-[60px] md:h-[80px] w-full block border-b border-b-[#EBEBEC] shadow-sm sticky top-0 z-[1000] bg-[#F0F0F0]">
      <div className="w-full h-full flex justify-between items-center px-3 sm:px-8 ">
        <h1 className="text-[18px] font-semibold hidden lg:block">
          <div className="text-black font-clash-display font-medium text-[1.25rem]">
            Good Morning, James!
          </div>
          {/* {state?.data?.first_name && (
            <div className="text-[16px] font-medium">
              Welcome, {state?.data?.first_name} {state?.data?.last_name}
            </div>
          )} */}
        </h1>
        <button
          onClick={() => {
            store.toggleOpen()
          }}
          className={cn(
            'block lg:hidden transition-all duration-300 ease-in-out',
            {
              'pl-[16rem]': isOpen,
            },
          )}
        >
          <i
            className={cn('bx bx-menu text-[2.5rem] text-black', {
              'bx-x': isOpen,
            })}
          ></i>
        </button>

        {/* <Button
          className="font-poppins !h-auto !w-auto px-6 py-2 flex justify-center items-center"
          onClick={handleClick}
        >
          Logout
          <i className="bx bx-exit ml-2 text-[16px]"></i>
        </Button> */}
        <img
          src={'/images/logo.svg'}
          className="w-[40px] h-[40px] cursor-pointer object-cover rounded-full object-top border-[2px] border-primary-text-color shadow-md active:shadow-sm p-1"
          onClick={handleOpen}
        />
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              // marginTop:'20px',
              mt: '22px',
              ml: '20px',
              borderRadius: '10px',
              width: '246px',

              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
        >
          <div className="pt-[10px] ">
            {/* <Link href={'/dashboard/profile'}>
              <div className="bg-white w-auto h-[34px] mb-[13px] relative pr-[16px]">
                <div
                  className={`ml-[18px] cursor-pointer w-auto h-full flex items-center justify-start pr-[15px] rounded-[5px] duration-300 transition-all ease-in-out   hover:text-primary  
                `}
                >
                  <span className="ml-[13px]">
                    <AccountCircleIcon />
                  </span>
                  <span className="ml-[14px]  font-semibold text-[16px]">
                    Profile
                  </span>
                </div>
              </div>
            </Link> */}

            <div
              className="bg-white w-auto h-[34px] mb-[13px] relative pr-[16px]"
              onClick={handleClick}
            >
              <div
                className={`ml-[18px] cursor-pointer w-auto h-full flex items-center justify-start pr-[15px] rounded-[5px] duration-300 transition-all ease-in-out   hover:text-primary  
                `}
              >
                <span className="ml-[13px]">
                  <ExitToAppOutlinedIcon />
                </span>
                <span className="ml-[14px]  font-semibold text-[16px]">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  )
}

export default DashboardNavbar
