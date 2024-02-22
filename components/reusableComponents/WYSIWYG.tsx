import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface EditorProps {
  handleChange: (content: string) => void
  value?: string
}

const WYSIWYG: React.FC<EditorProps> = ({ handleChange, value }) => {
  const editorRef = useRef<any>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(true)
  }, [loaded])

  return (
    loaded && (
      <Editor
        apiKey="h3r0yb4wltqwanftl730o5x9ybrxhz9mxuoeu5keq71mrcyx"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        onChange={() => handleChange(editorRef.current.getContent())}
        init={{
          height: 250,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    )
  )
}

export default WYSIWYG
