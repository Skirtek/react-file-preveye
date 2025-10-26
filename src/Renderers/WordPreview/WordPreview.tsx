import React, { useCallback, useEffect, useState } from 'react'
import mammoth from 'mammoth'
import { Container, LoadingMessage, ErrorMessage, ContentWrapper, Title, Content } from './WordPreview.styles'

interface WordPreviewProps {
    file: File | Blob
    fileName: string
}

const WordPreview: React.FC<WordPreviewProps> = ({ file, fileName }) => {
    const [html, setHtml] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const loadDocx = useCallback(async () => {
        setLoading(true)
        setError('')

        try {
            const arrayBuffer = await file.arrayBuffer()

            const result = await mammoth.convertToHtml(
                { arrayBuffer },
                {
                    styleMap: [
                        "p[style-name='Heading 1'] => h1:fresh",
                        "p[style-name='Heading 2'] => h2:fresh",
                        "p[style-name='Heading 3'] => h3:fresh",
                        "p[style-name='Heading 4'] => h4:fresh",
                        "p[style-name='Heading 5'] => h5:fresh",
                        "p[style-name='Heading 6'] => h6:fresh",
                    ],
                },
            )

            setHtml(result.value)

            if (result.messages.length > 0) {
                /* eslint-disable-next-line no-console */
                console.warn('Mammoth conversion messages:', result.messages)
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? `Failed to load document: ${err.message}`
                    : 'Failed to load document. The file may be corrupted or in an unsupported format.',
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadDocx()
    }, [file])

    if (loading) {
        return (
            <Container>
                <LoadingMessage>Loading document...</LoadingMessage>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage>{error}</ErrorMessage>
            </Container>
        )
    }

    return (
        <Container>
            <ContentWrapper>
                <Title>{fileName}</Title>
                <Content dangerouslySetInnerHTML={{ __html: html }} />
            </ContentWrapper>
        </Container>
    )
}

export default WordPreview
