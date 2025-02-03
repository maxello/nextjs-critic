"use client";
import React from 'react'
import { IKImage, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

const ImageComponent = ({
  path,
  width = 200,
  height = 300,
  cls,
  alt = "Image description"
}: {
  path: string,
  cls: string,
  width: number,
  height: number,
  alt: string
}) => {
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <IKImage
        className={cls}
        path={path}
        alt={alt}
        width={width}
        height={height}
      />
    </ImageKitProvider>
  )
}

export default ImageComponent;