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
import LeftIcon from '../../../../../public/icons/left-icon.svg'
import LeftIconWhite from '../../../../../public/icons/left-icon-white.svg'
import Link from 'next/link'
import { cn } from '@/utils/utils'
import CreateComponent from '@/container/industries/sector-focus/CreateComponent'
import EditComponent from '@/container/industries/sector-focus/EditComponent'

const Page = () => {
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: null,
  })

  const [opened, setOpened] = useState<any>([])

  const getProductList = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.get(`${API_URLS.GET_INDUSTRY_API}`)

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
    getProductList()
  }, [])

  const handleClickAdd = (type: string) => {
    openModal(
      CreateComponent,
      null,
      {
        height: '80vh',
        width: '900px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getProductList,
    )
  }

  const handleClickEdit = (data: any, type?: string) => {
    openModal(
      EditComponent,

      { data },
      {
        height: '80vh',
        width: '800px',
        borderRadius: '8px',

        closeOnClickOutside: false,
      },
      getProductList,
    )
  }
  const handleClickShow = (index: number) => {
    const isOpened = opened?.includes(index)
    if (isOpened) {
      setOpened((prev: any) => {
        const newOpened = opened?.filter((op: any) => op != index)
        return newOpened
      })
    } else {
      setOpened((prev: any) => [...prev, index])
    }
  }

  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.INDUSTRY_API}`,
        false,
        { id },
      )
      getProductList()

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
            Create Industry
          </button>
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
            {state?.data?.map((tD: any, index: number) => {
              const isOpened = opened?.includes(index)
              return (
                <div
                  className="flex flex-col border-b-[0.5px] border-[#61b82fab]"
                  key={index}
                >
                  <div className="flex items-center gap-[1rem] py-[1.25rem] ">
                    <div className="w-full flex flex-col gap-y-[0.625rem]">
                      <div className=" text-[1rem]">{tD?.name ?? '-'}</div>
                    </div>

                    <div className="flex justify-end items-end  gap-2">
                      <div
                        className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                        onClick={() => handleClickDelete(tD?.id, 'title')}
                      >
                        <div className="w-[16px] h-[16px] relative overflow-hidden !z-20 cursor-pointer">
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
                        onClick={() => handleClickEdit(tD, 'title')}
                      >
                        <div className="w-[16px] h-[16px] relative overflow-hidden !z-20 cursor-pointer ">
                          <Image
                            src={EditIcon}
                            alt="edit icon"
                            fill
                            className="w-full h-full aspect-video"
                          />
                        </div>
                      </div>
                      <div
                        className={cn(
                          'border border-[#B6B6B6] rounded-[0.5rem] p-2 ',
                          {
                            'bg-primary': isOpened,
                          },
                        )}
                        onClick={() => handleClickShow(index)}
                      >
                        <div className="w-[16px] h-[16px] relative overflow-hidden !z-20 cursor-pointer ">
                          <Image
                            src={isOpened ? LeftIconWhite : LeftIcon}
                            alt="edit icon"
                            fill
                            className={cn(
                              'w-full h-full aspect-video -rotate-90',

                              {
                                'rotate-90': isOpened,
                              },
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isOpened && (
                    <div className="flex flex-col gap-y-[0.625rem] pb-4">
                      {tD?.details?.map((s: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-[1rem] border border-[#62B82F] rounded-[10px] p-[0.5rem]"
                        >
                          <div className="flex-1 text-[1rem]">
                            {s?.name ?? '-'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Page
