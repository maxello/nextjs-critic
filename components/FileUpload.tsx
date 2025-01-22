"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FileUp, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  onFileChange: (filePath: string) => void;
  value?: string;
}

type FileResProps = {
  filePath: string,
  name: string
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileResProps>({
    filePath: "",
    name: ""
  });
  useEffect(() => {
    if (value) {
      setFile((prev) => {
        return {
          ...prev,
          filePath: value
        }
      });
    }
  }, [value]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const onError = () => {
    setLoading(false);
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: FileResProps) => {
    setFile(res);
    onFileChange(res.filePath);
    setLoading(false);
    toast({
      title: `${type} uploaded successfully`,
      description: `${res.name} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => {
          setLoading(true);
          setProgress(0);
        }}
        onUploadProgress={({ loaded, total }: {loaded: number, total: number}) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <Button
        variant="secondary"
        className="flex justify-between"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <div className="flex items-center gap-2 justify-center">
          <FileUp size={15} />
          <p className="text-xs">{placeholder}</p>
        </div>
        {loading && (
          <LoaderCircle className="animate-spin" />
        )}
      </Button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full text-xs rounded-full bg-secondary overflow-hidden flex h-4 relative">
          <div className="inline-block progress h-full bg-primary text-center" style={{ width: `${progress}%` }}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{progress}%</div>
        </div>
      )}

      {file?.name && (
        <Link href={`${urlEndpoint}${file.filePath}`} target="_blank" className="text-primary text-xs overflow-hidden text-ellipsis text-nowrap">{file.name}</Link>
      )}

      {file?.filePath &&
        (type === "image" ? (
          <div className="rounded-xl border border-secondary max-w-[200px] overflow-hidden">
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              width={200}
              height={300}
              className="border border-secondary outline-none"
            />
          </div>
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="aspect-video w-full rounded-xl border border-secondary"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;