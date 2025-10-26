import React, { useEffect, useState } from 'react'
import { Container, Title, Content } from './TextPreview.styles'

interface TextPreviewProps {
    file: File | Blob
    fileName: string
}

const TextPreview: React.FC<TextPreviewProps> = ({ file, fileName }) => {
    const [text, setText] = useState<string>('Loading...')

    useEffect(() => {
        const reader = new FileReader()

        reader.onload = (e) => {
            setText((e.target?.result as string) || 'Could not read file')
        }

        reader.onerror = () => {
            setText('Error reading file')
        }

        reader.readAsText(file)
    }, [file])

    return (
        <Container>
            <Title>{fileName}</Title>
            <Content>{text}</Content>
        </Container>
    )
}

export default TextPreview
