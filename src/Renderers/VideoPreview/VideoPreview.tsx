import React, { useEffect, useState } from 'react'
import { StyledVideo } from './VideoPreview.styles'

interface VideoPreviewProps {
    file: File | Blob
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('')

    useEffect(() => {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    return (
        <StyledVideo src={previewUrl} controls>
            Your browser does not support video playback.
        </StyledVideo>
    )
}

export default VideoPreview
