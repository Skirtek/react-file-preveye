import React, { useEffect, useState } from 'react'
import { Container, AudioIcon, FileName, FileInfo, StyledAudio } from './AudioPreview.styles'
import { formatFileSize } from '../../Utils/FileHelper'

interface AudioPreviewProps {
    file: File | Blob
    fileName: string
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ file, fileName }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('')

    useEffect(() => {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    return (
        <Container>
            <AudioIcon>🎵</AudioIcon>
            <FileName>{fileName}</FileName>
            <FileInfo>
                {file.type} • {formatFileSize(file.size)}
            </FileInfo>
            <StyledAudio src={previewUrl} controls>
                Your browser does not support audio playback.
            </StyledAudio>
        </Container>
    )
}

export default AudioPreview
