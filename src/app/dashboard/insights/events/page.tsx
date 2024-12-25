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
import { cn, truncateString } from '@/utils/utils'
import CreateComponent from '@/container/insights/events/CreateComponent'
import EditComponent from '@/container/insights/events/EditComponent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SelectField from '@/components/SelectComponent/SelectField'

const Page = () => {
  const router = useRouter()
  // managing states
  const [state, setState] = useState<any>({
    loading: true,
    data: [
      {
        id: 1,
        name: 'Priya Sharma',
        icon: '/images/team-1.png',
        body: 'Hire our developers to leverage the competency of hosting web apps in the cloud, which provides additional benefits such as scale, affordability, security, and high uptime.',
        heading: 'Chief Technology Officer',
      },
      {
        id: 2,
        name: 'Priya Sharma 1',
        icon: '/images/team-2.png',
        body: 'Hire our developers to leverage the competency of hosting web apps in the cloud, which provides additional benefits such as scale, affordability, security, and high uptime.',
        heading: 'Chief Technology Officer',
      },
    ],
    status: 'all',
  })

  const getEventsList = async () => {
    setState((prev: any) => ({ ...prev, loading: true }))

    try {
      const response = await apiHandler.post(`${API_URLS.GET_EVENTS_API}`, {
        type: state.status,
      })

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
    getEventsList()
  }, [state.status])

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
      getEventsList,
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
      getEventsList,
    )
  }
  const handleDelete = async (id: any, type?: string) => {
    try {
      const response = await apiHandler.deleteRequest(
        `${API_URLS.EVENTS_API}`,
        false,
        { id },
      )
      getEventsList()

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

  const selectOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Upcoming',
      value: 'upcomming',
    },
    {
      label: 'Past',
      value: 'past',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-[1.25rem] ">
        <div className="flex justify-end items-center gap-4 flex-wrap">
          <div className="w-[150px] sm:w-[250px]">
            <SelectField
              placeholder="Select Status"
              name="status"
              setState={setState}
              hasStateHandler
              isClearable={false}
              options={selectOptions}
              value={selectOptions?.filter((u: any) => u.value == state.status)}
            />
          </div>
          <button
            className="flex justify-center items-center w-fit px-[1rem] py-[0.5rem] bg-transaprent rounded-[5px] border border-[#9F9F9F]"
            onClick={() => handleClickAdd('title')}
          >
            Create Events
          </button>
        </div>
      </div>

      {/* main */}

      <div className="w-full p-[1.5rem] bg-white rounded-[0.625rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] px-2">
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
              <div key={index} className="w-full ">
                <div
                  className="border border-[#62B82F] rounded-[20px]  p-[1rem] cursor-pointer"
                  onClick={() => {
                    router.push(`events/${deta.id}`)
                  }}
                >
                  <div className=" flex items-end justify-start gap-[1.5rem]">
                    <div
                      className={cn(
                        'w-[8.125rem] h-[8.5rem] relative overflow-hidden !z-20 rounded-[1.25rem] cursor-pointer transition-all duration-300 ease-in-out mb-[15px] ',
                      )}
                    >
                      <Image
                        src={deta.image}
                        alt={deta.name}
                        fill
                        className="w-full h-full object-cover object-center aspect-video"
                      />
                    </div>
                    <div className=" text-[1.25rem] font-normal mb-[1rem] flex-1 text-[#2D2D2D]">
                      <h1 className="font-semibold">{deta?.name ?? '-'}</h1>
                      <h1
                        className="break-words text-editor-content"
                        dangerouslySetInnerHTML={{
                          __html: deta?.description
                            ? truncateString(deta?.description, 200)
                            : '-',
                        }}
                      ></h1>
                    </div>
                  </div>

                  {
                    <div className="border border-[#62B82F] rounded-[0.625rem] p-[0.5rem]">
                      {deta?.type && deta?.type?.length != 0
                        ? deta?.type?.map((type: any) => type.name)?.join(', ')
                        : '-'}
                    </div>
                  }
                </div>

                <div className="flex justify-end items-center  py-[14px]">
                  <div className="flex items-center gap-[1rem]">
                    <div
                      className="border border-[#B6B6B6] rounded-[0.5rem] p-2"
                      onClick={() => handleClickDelete(deta?.id, 'title')}
                    >
                      <div className="w-[18px] h-[18px] relative overflow-hidden !z-20 cursor-pointer">
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
                      <div className="w-[18px] h-[18px] relative overflow-hidden !z-20 cursor-pointer ">
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
  )
}

export default Page
