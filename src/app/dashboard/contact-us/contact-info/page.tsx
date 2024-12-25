'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DeleteIcon from '../../../../../public/icons/delete.svg'
import EditIcon from '../../../../../public/icons/edit.svg'
import CreateComponent from '@/container/contact/information/CreateComponent'
import CreateComponentSupport from '@/container/contact/support/CreateComponent'
import CreateComponentSocial from '@/container/contact/social-account/CreateComponent'
import Table from '@/components/Table'
import { socialColumn } from '@/constants/common'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    socialLoading: true,
    supportLoading: true,
    data: null,
    supportData: null,
    socialData: null,
  })
  console.log(state.data, 'state data')
  const getContactInformation = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_CONTACT_INFO_API}`)

      if (response?.data) {
        setState((prev: any) => ({
          ...prev,
          loading: false,
          data: response.data,
        }))
      }
    } catch (error) {
      setState((prev: any) => ({ ...prev, loading: false, data: null }))
      console.log(error)
    }
  }

  const getCustomerSupport = async () => {
    setState((prev: any) => ({ ...prev, supportLoading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_SUPPORT_INFO_API}`)

      if (response?.data) {
        setState((prev: any) => ({
          ...prev,
          supportLoading: false,
          supportData: response.data,
        }))
      }
    } catch (error) {
      setState((prev: any) => ({
        ...prev,
        supportLoading: false,
        supportData: null,
      }))
      console.log(error)
    }
  }
  const getSocialData = async () => {
    setState((prev: any) => ({ ...prev, socialLoading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_SOCIAL_INFO_API}`)

      if (response?.data) {
        setState((prev: any) => ({
          ...prev,
          socialLoading: false,
          socialData: response.data,
        }))
      }
    } catch (error) {
      setState((prev: any) => ({
        ...prev,
        socialLoading: false,
        socialData: null,
      }))
      console.log(error)
    }
  }

  useEffect(() => {
    getSocialData()
  }, [])

  useEffect(() => {
    getContactInformation()
  }, [])

  useEffect(() => {
    getCustomerSupport()
  }, [])

  const handleClickAdd = (type: string) => {
    openModal(
      type == 'info'
        ? CreateComponent
        : type == 'support'
        ? CreateComponentSupport
        : CreateComponentSocial,

      null,
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      type == 'info'
        ? getContactInformation
        : type == 'support'
        ? getCustomerSupport
        : getSocialData,
    )
  }
  const handleClickEdit = (data: any, type?: string) => {
    openModal(
      type == 'info'
        ? CreateComponent
        : type == 'support'
        ? CreateComponentSupport
        : CreateComponentSocial,

      { data },
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      type == 'info'
        ? getContactInformation
        : type == 'support'
        ? getCustomerSupport
        : getSocialData,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${
          type == 'info' ? API_URLS.CONTACT_INFO_API : API_URLS.SOCIAL_INFO_API
        }`,
        false,
        { id },
      )
      if (type == 'info') {
        getContactInformation()
      } else if (type == 'support') {
        getCustomerSupport()
      } else {
        getSocialData()
      }

      toast.success('Deleted successfully.')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }
  const handleClickDelete = (id: any, type?: string) => {
    openModal(
      ConfirmationModal,
      null,
      {
        height: '',
        width: '410px',
        borderRadius: '8px',

        closeOnClickOutside: true,
      },
      () => {
        handleDelete(id, type)
      },

      {
        heading: 'Confirm Delete',
        title: 'Are you sure you want to delete this ?',
        approveText: 'Delete',
        isDelete: true,
      },
    )
  }

  const tableprops = {
    columns: socialColumn,
    data: state.socialLoading ? [] : state.socialData,
    handleDelete: handleClickDelete,
    handleEdit: handleClickEdit,
    loading: state.loading,
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="flex justify-end items-center gap-4 flex-wrap">
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('info')}
          >
            Create Information
          </button>
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('support')}
          >
            Create Support Information
          </button>
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem] mb-[1.5rem]">
        <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] border-b border-[#62B82F] ">
          Contact Information
        </div>

        {state?.loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.loading && !state?.data ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <>
            <div className="flex flex-col gap-y-[1rem] my-[1.25rem]">
              <div className="w-full grid md:grid-cols-6 gap-[1.25rem]">
                <div className="w-full flex flex-col gap-y-[0.625rem] md:col-span-2">
                  <div className="font-medium text-[1rem]">Phone Nubmer</div>
                  <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                    {state?.data?.phone ?? '-'}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-[0.625rem] md:col-span-2">
                  <div className="font-medium text-[1rem]">Email</div>
                  <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                    {state?.data?.email ?? '-'}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-[0.625rem] md:col-span-2">
                  <div className="font-medium text-[1rem]">Location</div>
                  <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                    {state?.data?.address ?? '-'}
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center  py-[14px]">
                <div className="flex items-center gap-[1rem]">
                  <div
                    className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                    onClick={() => handleClickDelete(state?.data?.id, 'info')}
                  >
                    <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer">
                      <Image
                        src={DeleteIcon}
                        alt="delete icon"
                        fill
                        className="w-full h-full aspect-video"
                      />
                    </div>
                  </div>
                  <div
                    className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                    onClick={() => handleClickEdit(state?.data, 'info')}
                  >
                    <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer ">
                      <Image
                        src={EditIcon}
                        alt="edit icon"
                        fill
                        className="w-full h-full aspect-video"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem] mb-[1.5rem]">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] border-b border-[#62B82F] ">
            Customer Support Information
          </div>
        </div>

        {state?.supportLoading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.supportLoading && !state?.supportData ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <>
            {state?.supportData?.map((tD: any, index: number) => (
              <div
                className="flex flex-col gap-y-[1rem] my-[1.25rem]"
                key={index}
              >
                <div className="w-full grid md:grid-cols-6 gap-[1.25rem]">
                  <div className="w-full flex flex-col gap-y-[0.625rem] md:col-span-3">
                    <div className="font-medium text-[1rem]">
                      Customer Support Email{' '}
                    </div>
                    <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                      {tD?.email ?? '-'}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-y-[0.625rem] md:col-span-3">
                    <div className="font-medium text-[1rem]">Contact</div>
                    <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                      {tD?.number ?? '-'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center  py-[14px]">
                  <div className="flex items-center gap-[1rem]">
                    <div
                      className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                      onClick={() => handleClickDelete(tD?.id, 'support')}
                    >
                      <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer">
                        <Image
                          src={DeleteIcon}
                          alt="delete icon"
                          fill
                          className="w-full h-full aspect-video"
                        />
                      </div>
                    </div>
                    <div
                      className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                      onClick={() => handleClickEdit(tD, 'support')}
                    >
                      <div className="w-[22px] h-[22px] relative overflow-hidden !z-20 cursor-pointer ">
                        <Image
                          src={EditIcon}
                          alt="edit icon"
                          fill
                          className="w-full h-full aspect-video"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit font-semibold text-[1.125rem] sm:text-[1.25rem] border-b border-[#62B82F] ">
            Social Account
          </div>
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('social')}
          >
            Create Social Account
          </button>
        </div>
        <div className="w-full my-[1.25rem]">
          <div className="w-full ">
            <Table {...tableprops} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
