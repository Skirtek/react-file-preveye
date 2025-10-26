import React, { useCallback, useEffect, useState } from 'react'
import {
    Container,
    ContentWrapper,
    LoadingMessage,
    ErrorMessage,
    EmptyMessage,
    Title,
    TableWrapper,
    Table,
    Thead,
    Th,
    Tr,
    Td,
} from './CsvPreview.styles'

interface CsvPreviewProps {
    file: File | Blob
    fileName: string
}

const CsvPreview: React.FC<CsvPreviewProps> = ({ file, fileName }) => {
    const [data, setData] = useState<string[][]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const parseCsv = useCallback((text: string): string[][] => {
        const rows: string[][] = []
        let currentRow: string[] = []
        let currentCell = ''
        let insideQuotes = false

        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            const nextChar = text[i + 1]

            if (char === '"') {
                if (insideQuotes && nextChar === '"') {
                    currentCell += '"'
                } else {
                    insideQuotes = !insideQuotes
                }
            } else if ((char === ',' || char === ';') && !insideQuotes) {
                currentRow.push(currentCell)
                currentCell = ''
            } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                if (char === '\r' && nextChar === '\n') {
                    i++
                }

                currentRow.push(currentCell)

                if (currentRow.length > 0 && currentRow.some((cell) => cell.trim() !== '')) {
                    rows.push(currentRow)
                }

                currentRow = []
                currentCell = ''
            } else {
                currentCell += char
            }
        }

        if (currentCell || currentRow.length > 0) {
            currentRow.push(currentCell)
            if (currentRow.some((cell) => cell.trim() !== '')) {
                rows.push(currentRow)
            }
        }

        const maxLength = Math.max(...rows.map((row) => row.length))
        return rows.map((row) => {
            while (row.length < maxLength) {
                row.push('')
            }
            return row
        })
    }, [])

    const loadCsv = useCallback(async () => {
        setLoading(true)
        setError('')

        try {
            const text = await file.text()

            const rows = parseCsv(text)

            if (rows.length === 0) {
                setError('The CSV file is empty.')
            } else {
                setData(rows)
            }
        } catch (err) {
            console.error('Error loading CSV:', err)
            setError(
                err instanceof Error
                    ? `Failed to load CSV: ${err.message}`
                    : 'Failed to load CSV. The file may be corrupted or in an unsupported format.',
            )
        } finally {
            setLoading(false)
        }
    }, [parseCsv])

    useEffect(() => {
        loadCsv()
    }, [file])

    if (loading) {
        return (
            <Container>
                <ContentWrapper>
                    <LoadingMessage>Loading CSV...</LoadingMessage>
                </ContentWrapper>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <ContentWrapper>
                    <ErrorMessage>{error}</ErrorMessage>
                </ContentWrapper>
            </Container>
        )
    }

    if (data.length === 0) {
        return (
            <Container>
                <ContentWrapper>
                    <EmptyMessage>No data found in this CSV file.</EmptyMessage>
                </ContentWrapper>
            </Container>
        )
    }

    const headers = data[0]
    const bodyRows = data.slice(1)

    return (
        <Container>
            <ContentWrapper>
                <Title>{fileName}</Title>
                <TableWrapper>
                    <Table>
                        <Thead>
                            <tr>
                                <Th></Th>
                                {headers.map((header, colIndex) => (
                                    <Th key={colIndex}>{header || `Column ${colIndex + 1}`}</Th>
                                ))}
                            </tr>
                        </Thead>
                        <tbody>
                            {bodyRows.map((row, rowIndex) => (
                                <Tr key={rowIndex}>
                                    <Td>{rowIndex + 1}</Td>
                                    {row.map((cell, colIndex) => (
                                        <Td key={colIndex}>{cell}</Td>
                                    ))}
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </ContentWrapper>
        </Container>
    )
}

export default CsvPreview
