import React from 'react'
import { formatFileSize } from '../../Utils/FileHelper'
import { Container, FileIcon, InfoRow, Message } from './FallbackPreview.styles'

interface FallbackPreviewProps {
    file: File | Blob
    fileName: string
    fileType: string
}

const FallbackPreview: React.FC<FallbackPreviewProps> = ({ file, fileName, fileType }) => {
    return (
        <Container>
            <FileIcon>📄</FileIcon>
            <InfoRow>
                <strong>File:</strong> {fileName}
            </InfoRow>
            <InfoRow>
                <strong>Type:</strong> {fileType}
            </InfoRow>
            <InfoRow>
                <strong>Size:</strong> {formatFileSize(file.size)}
            </InfoRow>
            <Message>Preview not available for this file type.</Message>
        </Container>
    )
}

export default FallbackPreview
