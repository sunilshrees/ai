import { truncateString } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'

export const Team = (props: any) => {
  const { name, position, description, image } = props.data

  return (
    <div className="flex flex-col items-center md:items-center  md:flex-row">
      <div className="w-[200px] aspect-square md:w-[400px] md:h-[300px] relative overflow-hidden !z-20 popular-destination-shadow cursor-pointer ">
        <Image
          src={image ?? '/images/testimonials.jpeg'}
          alt="team"
          fill
          className="w-full h-full object-cover object-center aspect-video"
        />
      </div>
      <div className="ml-0 md:ml-[30px] md:max-w-[589px] min-h-[193px] h-full w-full leading-[25px] px-4 md:px-0 relative flex justify-center items-center">
        <div className="flex flex-col gap-4 md:gap-[3rem] font-clash-display font-medium">
          <div className="mb-1 text-[1rem] md:text-[1.25rem] text-center md:text-left">
            <div
              className="break-words text-editor-content"
              dangerouslySetInnerHTML={{
                __html: truncateString(description, 225),
              }}
            ></div>
          </div>
          <div className="text-[1rem] md:text-[1.25rem] text-[#C9C9C9] text-center md:text-left">
            <div className="mb-1 ">{name}</div>
            <div className="mb-1 font-normal ">{position}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
