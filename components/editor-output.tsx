'use client'

import dynamic from 'next/dynamic'

import CustomCodeRenderer from '@/components/renderers/custom-code-renderer'
import CustomImageRenderer from '@/components/renderers/custom-image-renderer'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    // fontSize: '2.75rem',
    lineHeight: '1.25rem',
    marginBottom: "4rem"
  },
}

const EditorOutput = ({ content }: EditorOutputProps) => {
  return (
    <Output
      style={style}
      className='text-sm'
      renderers={renderers}
      data={content}
    />
  )
}

export default EditorOutput