import { truncateString } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'

export const Story = ({ data }: any) => {
  const { name, position, stories, image } = data

  return (
    <div className="h-auto max-h-[350px]  gap-y-[1.5rem] card-gradient-style-2 rounded-[1.50rem] p-[1.875rem]">
      <div className="flex flex-col lg:flex-row text-center lg:text-left   justify-center lg:justify-start items-center lg:items-start gap-x-[0.875rem] w-full h-full">
        <div className="w-[3.5rem] h-[3.5rem] relative overflow-hidden rounded-full">
          <Image
            src={image ?? '/images/testimonial-img.jpeg'}
            alt="hero image"
            fill
            className="w-full h-full object-cover object-top aspect-video"
            priority
          />
        </div>
        <div className="flex-1 h-full flex flex-col justify-between gap-4 text-[0.875rem] font-montserrat">
          <div>
            <h1 className="text-[1.25rem] font-semibold font-clash-display">
              {name ?? '-'}
            </h1>
            <h1 className="text-[1rem] font-montserrat text-[#C9C5C5]">
              {position ?? '-'}
            </h1>
          </div>
          <div className="text-justify text-p3 2xl:text-p2">
            <div
              className="break-words text-editor-content"
              dangerouslySetInnerHTML={{
                __html: stories,
              }}
            ></div>
          </div>
          {/* <h2>Dico user, 2021.03.02</h2> */}
        </div>
      </div>
    </div>
  )
}
