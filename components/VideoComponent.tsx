"use client";
import React from 'react'
import { ImageKitProvider, IKVideo } from "imagekitio-next";
import config from "@/lib/config";

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

const VideoComponent = ({
  path
}: {
  path: string
}) => {
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <IKVideo
        className="w-full aspect-video"
        path={path}
        controls={true}
      />
    </ImageKitProvider>
  )
}

export default VideoComponent