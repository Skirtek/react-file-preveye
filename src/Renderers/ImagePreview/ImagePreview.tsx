import React, { useEffect, useState } from 'react'
import { StyledImage } from './ImagePreview.styles'

interface ImagePreviewProps {
    file: File | Blob
    fileName: string
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, fileName }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('')

    useEffect(() => {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    return <StyledImage src={previewUrl} alt={fileName} />
}

export default ImagePreview
