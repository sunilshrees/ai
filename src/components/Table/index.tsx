'use client'

import { Menu } from '@mui/material'
import { get } from 'lodash'
import Image from 'next/image'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const Table = (props: any) => {
  const { data, columns } = props

  const displayData = (item: any, cols: any) => {
    if (cols.key == 'message') {
      return <div className="pr-6 ">{get(item, cols.key, '-') ?? '-'}</div>
    } else if (cols.type == 'image') {
      const imgSrc = get(item, cols.key, null)
      return (
        <div className="pr-6 ">
          <img src={imgSrc} className="max-w-[54px] max-h-[54px]" alt="" />
        </div>
      )
    } else if (cols.key == 'description') {
      return (
        <div className="pr-6 max-w-[80%] w-full">
          {get(item, cols.key, '-') ?? '-'}
        </div>
      )
    } else {
      return (
        <div className="pr-6 break-words">
          {get(item, cols.key, '-') ?? '-'}
        </div>
      )
    }
  }

  // State to keep track of which menu is open
  const [anchorEl, setAnchorEl] = useState<any>({})

  // Handler to open the menu
  const handleMenuOpen = (event: any, id: any) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget })
  }

  // Handler to close the menu
  const handleMenuClose = (id: any) => {
    setAnchorEl({ ...anchorEl, [id]: null })
  }

  return (
    <>
      <div className="overflow-x-auto scrollbar_show_table bg-white pb-1">
        <div className="">
          <table className="xs:w-[150vw] lg:w-full text-[0.75rem] md:text-[1rem] text-left bg-white table-separate border-b border-[#EAEAEA] overflow-x-auto table-auto">
            <thead className="border-t  border-b border-[#EAEAEA] bg-[#EBEBEC]">
              <tr className=" break-words text-left text-[#090000] cursor-default !font-normal lg:font-semibold">
                <th className="pl-2 py-4 pr-6 !font-medium lg:font-semibold">
                  S.No.
                </th>
                {columns?.map((col: any, index: number) => (
                  <th
                    className="py-4 break-words pr-4 !font-medium lg:font-semibold"
                    key={col.label}
                    scope="col"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className=" overflow-x-auto">
              {data &&
                data?.map((item: any, index: any) => (
                  <React.Fragment key={item?.id ?? index}>
                    <tr className="text-left divide-y divide-[#EFE6E6]">
                      <td
                        scope="row"
                        className=" py-[17px] text-[#090000]  whitespace-nowrap border-b pl-2 pr-6 "
                      >
                        {index + 1}
                      </td>

                      {columns?.map((cols: any, idx: any) => {
                        if (cols.label !== 'Action' && cols.label !== '') {
                          return (
                            <td
                              className="h-full py-[17px] text-[#090000] break-words"
                              key={idx}
                            >
                              {displayData(item, cols)}
                            </td>
                          )
                        } else if (cols.label === 'Action') {
                          return (
                            <td
                              className=" py-[17px] text-[#090000] break-words gap-4"
                              key={idx}
                            >
                              <div className="flex gap-4">
                                {cols?.buttons?.map(
                                  (button: any, i: number) => {
                                    if (button.type === 'reset') {
                                      return (
                                        <button
                                          className=" relative overflow-hidden cursor-pointer"
                                          onClick={() => {
                                            props?.handleReset(item?.id)
                                          }}
                                          key={i}
                                          title="reset"
                                        >
                                          <RestartAltIcon
                                            fontSize="medium"
                                            className="!text-[25px] hover:scale-110 "
                                          />
                                        </button>
                                      )
                                    } else if (button.type === 'view') {
                                      return (
                                        <Link
                                          href={`${button.link(item.id)}`}
                                          key={i}
                                        >
                                          <span
                                            className={`text-gray-400 text-xs  cursor-pointer `}
                                            title="View"
                                          >
                                            <VisibilityIcon fontSize="medium" />
                                          </span>
                                        </Link>
                                      )
                                    } else if (button.type === 'download') {
                                      return (
                                        <a
                                          href={`${
                                            item?.[props?.downloadName]
                                          }`}
                                          key={i}
                                          target="_blank"
                                        >
                                          <span
                                            className={`text-gray-400 text-xs  cursor-pointer `}
                                            title="Download"
                                          >
                                            <FileDownloadIcon fontSize="medium" />
                                          </span>
                                        </a>
                                      )
                                    } else if (button.type === 'delete') {
                                      return (
                                        <button
                                          className="w-[22px] h-[22px] relative overflow-hidden cursor-pointer"
                                          onClick={() => {
                                            props?.handleDelete(item?.id)
                                          }}
                                          key={i}
                                        >
                                          <Image
                                            src={'/icons/delete.svg'}
                                            alt="delete icon"
                                            fill
                                            className="w-full h-full aspect-video"
                                          />
                                        </button>
                                      )
                                    } else if (button.type === 'edit') {
                                      return (
                                        <div
                                          className="w-[22px] h-[22px] relative overflow-hidden cursor-pointer"
                                          onClick={() => {
                                            props?.handleEdit(item)
                                          }}
                                          key={i}
                                        >
                                          <Image
                                            src={'/icons/edit.svg'}
                                            alt="delete icon"
                                            fill
                                            className="w-full h-full aspect-video"
                                          />
                                        </div>
                                      )
                                    } else if (
                                      button.type === 'expiry' &&
                                      !item?.is_expired
                                    ) {
                                      return (
                                        <button
                                          className=""
                                          onClick={() => {
                                            props?.handleExpire(item)
                                          }}
                                          key={i}
                                          title="Expire job"
                                        >
                                          <i className="bx bx-calendar-x text-[23px] text-blue-700"></i>
                                        </button>
                                      )
                                    } else if (
                                      button.type === 'seen' &&
                                      !item?.seen
                                    ) {
                                      return (
                                        <button
                                          className=""
                                          onClick={() => {
                                            props?.handleSeen(item)
                                          }}
                                          key={i}
                                          title="Mark it as seen"
                                        >
                                          <i className="bx bx-show-alt text-[25px] "></i>
                                        </button>
                                      )
                                    } else if (button.type === 'menu') {
                                      return (
                                        <React.Fragment key={i}>
                                          <div
                                            className="w-[25px] h-[30px] relative overflow-hidden cursor-pointer"
                                            onClick={(event) =>
                                              handleMenuOpen(event, item.id)
                                            }
                                            aria-controls={`menu-${item.id}`}
                                            aria-haspopup="true"
                                          >
                                            <Image
                                              src={'/images/option.svg'}
                                              alt="delete icon"
                                              fill
                                              className="w-full h-full aspect-video"
                                            />
                                          </div>
                                          <Menu
                                            id={`menu-${item.id}`}
                                            anchorEl={anchorEl[item.id]}
                                            open={Boolean(anchorEl[item.id])}
                                            onClose={() =>
                                              handleMenuClose(item.id)
                                            }
                                            onClick={() =>
                                              handleMenuClose(item.id)
                                            }
                                            PaperProps={{
                                              elevation: 0,
                                              sx: {
                                                overflow: 'visible',
                                                filter:
                                                  'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: '24px',
                                                ml: '20px',
                                                borderRadius: '8px',
                                                width: '250px',
                                                padding: '0px',

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
                                            <props.optionMenu
                                              data={item}
                                              recallFunction={
                                                props?.recallFunction
                                              }
                                            />
                                          </Menu>
                                        </React.Fragment>
                                      )
                                    }
                                  },
                                )}
                              </div>
                            </td>
                          )
                        }
                      })}
                    </tr>
                  </React.Fragment>
                ))}
              {props?.loading && data?.length == 0 && (
                <tr className="w-full ">
                  <td colSpan={100}>
                    <div className="py-[50px]  w-full ">
                      {' '}
                      <Loader />
                    </div>
                  </td>
                </tr>
              )}
              {(data?.length == 0 || data == undefined) && !props?.loading && (
                <tr className="w-full">
                  <td colSpan={100}>
                    <div className="py-[30px] text-center w-full">
                      No Data Found{' '}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
