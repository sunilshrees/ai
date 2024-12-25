'use client'

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loader from '@/components/Loader/Loader'
import { API_URLS } from '@/constants/ApiRoutes'
import apiHandler from '@/utils/apiHandler'
import { openModal } from '@/utils/openModal'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DeleteIcon from '../../../../../../public/icons/delete.svg'
import EditIcon from '../../../../../../public/icons/edit.svg'
import CreateComponent from '@/container/about/company-overview/CreateComponent'

import BackButton from '@/components/BackButton'
import { useRouter } from 'next/navigation'

const Page = ({ params }: any) => {
  const { id } = params

  const router = useRouter()
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: null,
  })

  const getOverviewById = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.post(
        `${API_URLS.COMPANY_OVERVIEW_LIST_API}`,
        {
          id,
        },
      )

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
    getOverviewById()
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
      getOverviewById,
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
      getOverviewById,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.COMPANY_OVERVIEW_API}`,
        false,
        { id },
      )
      router.push('/dashboard/about-us/company-overview')

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

  console.log(state)

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
          <BackButton />
          {/* <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('title')}
          >
            Create Hero Section
          </button> */}
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        {state?.loading ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : !state?.loading && !state?.data ? (
          <div className="my-6">No Data Found</div>
        ) : (
          <>
            <div className="flex flex-col gap-y-[1rem] my-[1.25rem]">
              <div className="w-full flex flex-col gap-y-[0.625rem]">
                <div className="font-medium text-[1rem]">Heading Text</div>
                <div className=" text-[1rem] border border-[#62B82F] rounded-[10px] p-[1rem]">
                  {state?.data?.name}
                </div>
              </div>

              <div className="flex flex-col gap-y-[0.625rem]">
                <div className="font-medium text-[1rem]">Body Text</div>
                <div className="w-full h-auto rounded-[10px] p-[1rem]  border border-[#62B82F] text-[16px]">
                  <div
                    className="break-words text-editor-content"
                    dangerouslySetInnerHTML={{
                      __html: state?.data?.description ?? '-',
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-end items-center  py-[14px]">
                <div className="flex items-center gap-[1rem]">
                  <div
                    className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                    onClick={() => handleClickDelete(state?.data?.id, 'title')}
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
                    onClick={() => handleClickEdit(state?.data, 'title')}
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
    </div>
  )
}

export default Page
