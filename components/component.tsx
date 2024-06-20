/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/PQtgGPYs6Nt
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

'use client'

import { ChangeEvent, useState } from 'react';
import { IconProps } from "@radix-ui/react-icons/dist/types"

export function Component() {
  const [uploading, setUploading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setUploading(true)

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      }
      reader.readAsDataURL(uploadedFile)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ filename: uploadedFile.name })
        })
        console.log('RESPONSE', res)
        if (res.ok) {
          const { url }: { url: string } = await res.json();
          console.log('RESPONSE URL', url)
          const formData = new FormData()
          // Object.entries(fields).forEach(([key, value]) => {
          //   formData.append(key, value as string)
          // })

          formData.append('file', uploadedFile)

          const uploadRes = await fetch(url, {
            method: 'PUT',
            body: formData
          })

          if (uploadRes.ok) {

            setMessage('File Upload Successful')
          } else {

            setMessage('File Upload Failed')
          }

        } else {
          setMessage('Pre-signed URL error')
        }
      } catch (error) {
        setMessage('An error occured')
      } finally {
        setUploading(false)
      }
    }

  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl p-6 md:p-8 lg:p-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Upload an Image</h1>
            <div className="flex justify-center items-center h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6">
              <label
                className="cursor-pointer flex flex-col items-center justify-center space-y-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                htmlFor="image-upload"
              >
                <UploadIcon className="w-8 h-8" />
                <span>Drag and drop or click to upload</span>
                <input accept="image/*" className="hidden" id="image-upload" type="file" onChange={handleFileChange} />
              </label>
            </div>
            {
              preview && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <img
                    src={preview}
                    alt="Uploaded Image"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-t-lg"
                  />
                </div>
              )
            }
            {
              uploading ?
                <p>Uploading ...</p> :
                <p>{message}</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


function UploadIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
