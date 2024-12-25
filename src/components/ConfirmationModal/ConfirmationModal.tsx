import { cn } from '@/utils/utils'

const ConfirmationModal = (props: any) => {
  const { additionalItems, callFunction, callback } = props

  const { title, heading, approveText, isDelete } = additionalItems

  const handleApprove = () => {
    callFunction()
    callback()
  }
  const handleClose = () => {
    callback()
  }
  return (
    <div className="w-full pl-[12px] pr-[32px] pb-[1.5rem] font-montserrat text-black">
      <p className={`text-[1.25rem] text-center pt-[1.5rem] font-medium`}>
        {heading}
      </p>
      <p className={`text-[18px] text-center pb-[2rem]`}>{title}</p>
      <div className="flex flex-col gap-[0.625rem] items-center justify-between">
        <button
          className={cn(
            `w-full py-[12px] rounded-[6px]  border-none bg-primary`,
            {
              'bg-[#A90011]': isDelete,
            },
          )}
          onClick={handleApprove}
        >
          <h1 className="text-[1rem] text-white font-medium">
            {approveText ? approveText : 'Add'}
          </h1>
        </button>
        <button
          className="w-full py-[12px] rounded-[6px] bg-[#E3E3E3] border-none"
          onClick={handleClose}
        >
          <h1 className="text-[1rem] text-black font-medium">Cancel</h1>
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
