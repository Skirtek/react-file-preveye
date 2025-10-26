import React, { useEffect, useState } from 'react'
import { StyledIframe } from './PdfPreview.styles'

interface PdfPreviewProps {
    file: File | Blob
    fileName: string
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ file, fileName }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('')

    useEffect(() => {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    return <StyledIframe src={previewUrl} title={fileName} />
}

export default PdfPreview
