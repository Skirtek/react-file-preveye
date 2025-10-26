import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import {
    Container,
    ContentWrapper,
    LoadingMessage,
    ErrorMessage,
    EmptyMessage,
    Title,
    SheetTabs,
    SheetTab,
    TableWrapper,
    Table,
    Thead,
    Th,
    Tr,
    Td,
} from './ExcelPreview.styles'

interface ExcelPreviewProps {
    file: File | Blob
    fileName: string
}

interface SheetData {
    name: string
    data: any[][]
}

const ExcelPreview: React.FC<ExcelPreviewProps> = ({ file, fileName }) => {
    const [sheets, setSheets] = useState<SheetData[]>([])
    const [activeSheet, setActiveSheet] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const loadXlsx = async () => {
            setLoading(true)
            setError('')

            try {
                const arrayBuffer = await file.arrayBuffer()

                const workbook = XLSX.read(arrayBuffer, { type: 'array' })

                const sheetsData: SheetData[] = workbook.SheetNames.map((sheetName) => {
                    const worksheet = workbook.Sheets[sheetName]
                    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
                    return {
                        name: sheetName,
                        data: data as any[][],
                    }
                })

                setSheets(sheetsData)
                setActiveSheet(0)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? `Failed to load spreadsheet: ${err.message}`
                        : 'Failed to load spreadsheet. The file may be corrupted or in an unsupported format.',
                )
            } finally {
                setLoading(false)
            }
        }

        loadXlsx()
    }, [file])

    if (loading) {
        return (
            <Container>
                <ContentWrapper>
                    <LoadingMessage>Loading spreadsheet...</LoadingMessage>
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

    if (sheets.length === 0) {
        return (
            <Container>
                <ContentWrapper>
                    <EmptyMessage>No sheets found in this workbook.</EmptyMessage>
                </ContentWrapper>
            </Container>
        )
    }

    const currentSheet = sheets[activeSheet]
    const hasData = currentSheet.data.length > 0

    return (
        <Container>
            <ContentWrapper>
                <Title>{fileName}</Title>

                {sheets.length > 1 && (
                    <SheetTabs>
                        {sheets.map((sheet, index) => (
                            <SheetTab key={index} $active={activeSheet === index} onClick={() => setActiveSheet(index)}>
                                {sheet.name}
                            </SheetTab>
                        ))}
                    </SheetTabs>
                )}

                {hasData ? (
                    <TableWrapper>
                        <Table>
                            <Thead>
                                <tr>
                                    <Th></Th>
                                    {currentSheet.data[0].map((cell: any, colIndex: number) => (
                                        <Th key={colIndex}>{cell || `Column ${colIndex + 1}`}</Th>
                                    ))}
                                </tr>
                            </Thead>
                            <tbody>
                                {currentSheet.data.slice(1).map((row: any[], rowIndex: number) => (
                                    <Tr key={rowIndex}>
                                        <Td>{rowIndex + 1}</Td>
                                        {row.map((cell: any, colIndex: number) => (
                                            <Td key={colIndex}>
                                                {cell !== null && cell !== undefined ? String(cell) : ''}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrapper>
                ) : (
                    <EmptyMessage>This sheet is empty.</EmptyMessage>
                )}
            </ContentWrapper>
        </Container>
    )
}

export default ExcelPreview
