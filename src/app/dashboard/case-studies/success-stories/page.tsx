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
import { cn } from '@/utils/utils'
import CreateComponent from '@/container/case-studies/success-stories/CreateComponent'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: null,
  })

  const getCaseStudies = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_CASE_STUDIES_API}`)

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

  useEffect(() => {
    getCaseStudies()
  }, [])

  const handleClickAdd = (type: string) => {
    openModal(
      CreateComponent,
      null,
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getCaseStudies,
    )
  }
  const handleClickEdit = (data: any, type?: string) => {
    openModal(
      CreateComponent,

      { data },
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getCaseStudies,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.CASE_STUDIES_API}`,
        false,
        { id },
      )
      getCaseStudies()

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

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="flex justify-end items-center gap-4 flex-wrap">
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('title')}
          >
            Create Case Study
          </button>
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        <div className="w-full flex justify-start ">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[30px] px-2">
            {state?.loading && (
              <div className="col-span-full w-full">
                <Loader />
              </div>
            )}
            {!state?.loading && (!state?.data || state?.data?.length == 0) && (
              <div>No Data Found</div>
            )}
            {!state?.loading &&
              state?.data?.map((deta: any, index: number) => (
                <div key={index} className="">
                  <div className="border border-[#62B82F] rounded-[20px]  px-[1.25rem] py-[2rem] relative min-h-[250px] w-full">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                      <div className="w-full h-full relative rounded-[1.25rem] overflow-hidden vignette">
                        <Image
                          src={deta?.image}
                          alt="hero image"
                          fill
                          className="w-full h-full object-cover object-top aspect-video"
                          priority
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 text-[1.25rem] font-normal mb-[1rem] text-white z-20 px-[1.25rem] w-full">
                      {deta?.title ?? '-'}
                    </div>

                    {/* <div className=" text-[1rem]">{deta?.body ?? '-'}</div> */}
                  </div>

                  <div className="flex justify-end items-center  py-[14px]">
                    <div className="flex items-center gap-[1rem]">
                      <div
                        className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                        onClick={() => handleClickDelete(deta?.id, 'title')}
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
                        onClick={() => handleClickEdit(deta, 'title')}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
