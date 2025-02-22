/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/Button';
// import { Input } from "@/components/ui/Input";
// import { Label } from "@/components/ui/Label";
import { Progress } from '@/components/ui/Progress';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Loader2Icon, Trash2, UserPen } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ProfileInfos() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    handleRemoveAvatar,
    handleUploadAvatar,
    setUpload,
    userLogged,
    loadingAvatar,
    progressLoadingAvatar,
  } = useAuth();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setUpload(selectedFile);

        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    },
  });

  return (
    <div className="flex flex-col items-center px-0 md:px-10 xl:px-32 mt-4">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div
            {...getRootProps()}
            className={cn(
              'border h-44 w-44 rounded-lg border-dashed transition-colors flex items-center justify-center cursor-pointer hover:z-10',
              isDragActive && 'bg-accent/50 '
            )}
          >
            <input {...getInputProps()} />

            {preview || userLogged.avatarUrl ? (
              <div className="h-full w-full rounded-md object-cover relative">
                <img
                  src={preview ?? userLogged.avatarUrl}
                  alt="Preview do avatar"
                  className="h-full w-full rounded-lg object-cover"
                />

                <Trash2
                  className="absolute top-4 right-4 hover:z-50"
                  stroke="#f53d3d"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAvatar();
                    setPreview(null);
                  }}
                />
              </div>
            ) : (
              <UserPen size={50} className="stroke-[#ccc]" />
            )}
          </div>

          {loadingAvatar && (
            <Progress className="h-2 mt-3" value={progressLoadingAvatar} />
          )}

          <div className="mt-4 flex flex-col items-center justify-center">
            <span className="text-[#1E1E1E] text-[16px] font-semibold">
              {userLogged.name}
            </span>

            <span className="text-[#7c7a7a] text-[16px] font-semibold">
              {userLogged.email}
            </span>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center gap-4 w-[40%]">
          <div className="grid w-full items-center">
            <Label className="text-xs" htmlFor="email">
              E-mail
            </Label>
            <Input id="email" placeholder="E-mail" />

            {errors.email && (
								<span className='text-red-400 text-xs'>
									{errors.email.message}
								</span>
							)}
          </div>

          <div className="grid w-full items-center">
            <Label className="text-xs" htmlFor="phone">
              Telefone
            </Label>
            <Input id="phone" placeholder="Telefone" />

            {errors.email && (
								<span className='text-red-400 text-xs'>
									{errors.email.message}
								</span>
							)}
          </div>
        </div> */}
      </div>

      <div className="w-[40%] flex justify-center">
        <Button
          onClick={handleUploadAvatar}
          disabled={loadingAvatar}
          className="bg-[#2B0036] hover:bg-[#492452] mt-4 w-1/3 rounded-full gap-2"
        >
          {loadingAvatar && <Loader2Icon className="size-4 animate-spin" />}
          Salvar
        </Button>
      </div>
    </div>
  );
}
