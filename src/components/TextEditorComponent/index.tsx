'use client'

import 'react-quill/dist/quill.snow.css' // Import Quill styles
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { cn } from '@/utils/utils'

interface EditorProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  disabled?: boolean
  classname?: string
}

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
}

const TextEditor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  classname,
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  return (
    <div className={cn('text-editor !font-poppins', classname)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        readOnly={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextEditor
