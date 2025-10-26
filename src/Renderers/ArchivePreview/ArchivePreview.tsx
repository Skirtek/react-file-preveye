import React, { useEffect, useState } from 'react'
import {
    Container,
    ContentWrapper,
    LoadingMessage,
    ErrorMessage,
    EmptyMessage,
    Header,
    Title,
    ArchiveIcon,
    Stat,
    StatLabel,
    StatValue,
    FileListHeader,
    Stats,
    FileItem,
    FileList,
    FileName,
    FileIcon,
    FileSize,
    FileDate,
} from './ArchivePreview.styles'
import { formatFileSize } from '../../Utils/FileHelper'

interface ArchivePreviewProps {
    file: File | Blob
    fileName: string
}

interface ArchiveEntry {
    name: string
    size: number
    compressedSize: number
    isDirectory: boolean
    date: Date | null
}

const ArchivePreview: React.FC<ArchivePreviewProps> = ({ file, fileName }) => {
    const [entries, setEntries] = useState<ArchiveEntry[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const loadArchive = async () => {
        setLoading(true)
        setError('')

        try {
            const ext = fileName.toLowerCase().split('.').pop() || ''

            if (ext === 'zip') {
                const parsed = await parseZip(file)
                setEntries(parsed)
            } else {
                setError(`Archive format '.${ext}' is not yet supported. Currently only ZIP files are supported.`)
            }
        } catch (err) {
            console.error('Error loading archive:', err)
            setError(
                err instanceof Error
                    ? `Failed to read archive: ${err.message}`
                    : 'Failed to read archive. The file may be corrupted.',
            )
        } finally {
            setLoading(false)
        }
    }

    const parseZip = async (file: File | Blob): Promise<ArchiveEntry[]> => {
        const arrayBuffer = await file.arrayBuffer()
        const view = new DataView(arrayBuffer)
        const entries: ArchiveEntry[] = []

        let endOfCentralDir = -1

        for (let i = view.byteLength - 22; i >= 0; i--) {
            if (view.getUint32(i, true) === 0x06054b50) {
                endOfCentralDir = i
                break
            }
        }

        if (endOfCentralDir === -1) {
            throw new Error('Invalid ZIP file: End of central directory not found')
        }

        const centralDirOffset = view.getUint32(endOfCentralDir + 16, true)
        const totalEntries = view.getUint16(endOfCentralDir + 10, true)

        let offset = centralDirOffset

        for (let i = 0; i < totalEntries; i++) {
            if (view.getUint32(offset, true) !== 0x02014b50) {
                throw new Error('Invalid central directory header')
            }

            const fileNameLength = view.getUint16(offset + 28, true)
            const extraFieldLength = view.getUint16(offset + 30, true)
            const fileCommentLength = view.getUint16(offset + 32, true)
            const compressedSize = view.getUint32(offset + 20, true)
            const uncompressedSize = view.getUint32(offset + 24, true)

            // Get date/time
            const dosTime = view.getUint16(offset + 12, true)
            const dosDate = view.getUint16(offset + 14, true)
            const date = dosDateToJsDate(dosDate, dosTime)

            // Read file name
            const nameBytes = new Uint8Array(arrayBuffer, offset + 46, fileNameLength)
            const decoder = new TextDecoder('utf-8')
            const name = decoder.decode(nameBytes)

            const isDirectory = name.endsWith('/')

            entries.push({
                name: name,
                size: uncompressedSize,
                compressedSize: compressedSize,
                isDirectory: isDirectory,
                date: date,
            })

            offset += 46 + fileNameLength + extraFieldLength + fileCommentLength
        }

        return entries
    }

    const dosDateToJsDate = (dosDate: number, dosTime: number): Date | null => {
        try {
            const day = dosDate & 0x1f
            const month = ((dosDate >> 5) & 0x0f) - 1
            const year = ((dosDate >> 9) & 0x7f) + 1980

            const seconds = (dosTime & 0x1f) * 2
            const minutes = (dosTime >> 5) & 0x3f
            const hours = (dosTime >> 11) & 0x1f

            return new Date(year, month, day, hours, minutes, seconds)
        } catch {
            return null
        }
    }

    const formatDate = (date: Date | null): string => {
        if (!date) return '-'
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getFileIcon = (entry: ArchiveEntry): string => {
        if (entry.isDirectory) return '📁'

        const ext = entry.name.toLowerCase().split('.').pop() || ''
        const iconMap: { [key: string]: string } = {
            jpg: '🖼️',
            jpeg: '🖼️',
            png: '🖼️',
            gif: '🖼️',
            bmp: '🖼️',
            svg: '🖼️',
            mp4: '🎬',
            avi: '🎬',
            mov: '🎬',
            mkv: '🎬',
            mp3: '🎵',
            wav: '🎵',
            flac: '🎵',
            ogg: '🎵',
            pdf: '📄',
            doc: '📝',
            docx: '📝',
            txt: '📝',
            xls: '📊',
            xlsx: '📊',
            csv: '📊',
            zip: '📦',
            rar: '📦',
            '7z': '📦',
            tar: '📦',
            gz: '📦',
            js: '📜',
            ts: '📜',
            py: '📜',
            java: '📜',
            c: '📜',
            cpp: '📜',
            cs: '📜',
            html: '🌐',
            css: '🎨',
            json: '📋',
            xml: '📋',
        }

        return iconMap[ext] || '📄'
    }

    const calculateStats = () => {
        const fileCount = entries.filter((e) => !e.isDirectory).length
        const folderCount = entries.filter((e) => e.isDirectory).length
        const totalSize = entries.reduce((sum, e) => sum + e.size, 0)
        const totalCompressed = entries.reduce((sum, e) => sum + e.compressedSize, 0)
        const compressionRatio = totalSize > 0 ? ((1 - totalCompressed / totalSize) * 100).toFixed(1) : '0'

        return { fileCount, folderCount, totalSize, compressionRatio }
    }

    useEffect(() => {
        loadArchive()
    }, [file, fileName])

    if (loading) {
        return (
            <Container>
                <ContentWrapper>
                    <LoadingMessage>Reading archive contents...</LoadingMessage>
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

    if (entries.length === 0) {
        return (
            <Container>
                <ContentWrapper>
                    <EmptyMessage>This archive is empty.</EmptyMessage>
                </ContentWrapper>
            </Container>
        )
    }

    const stats = calculateStats()

    return (
        <Container>
            <ContentWrapper>
                <Header>
                    <Title>
                        <ArchiveIcon>📦</ArchiveIcon>
                        {fileName}
                    </Title>
                    <Stats>
                        <Stat>
                            <StatLabel>Files</StatLabel>
                            <StatValue>{stats.fileCount}</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>Folders</StatLabel>
                            <StatValue>{stats.folderCount}</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>Total Size</StatLabel>
                            <StatValue>{formatFileSize(stats.totalSize)}</StatValue>
                        </Stat>
                        <Stat>
                            <StatLabel>Compression</StatLabel>
                            <StatValue>{stats.compressionRatio}%</StatValue>
                        </Stat>
                    </Stats>
                </Header>

                <FileList>
                    <FileListHeader>
                        <div>Name</div>
                        <div style={{ textAlign: 'right' }}>Size</div>
                        <div style={{ textAlign: 'right' }}>Compressed</div>
                        <div style={{ textAlign: 'right' }}>Modified</div>
                    </FileListHeader>
                    {entries.map((entry, index) => (
                        <FileItem key={index} $isDirectory={entry.isDirectory}>
                            <FileName $isDirectory={entry.isDirectory}>
                                <FileIcon>{getFileIcon(entry)}</FileIcon>
                                {entry.name}
                            </FileName>
                            <FileSize>{entry.isDirectory ? '-' : formatFileSize(entry.size)}</FileSize>
                            <FileSize>{entry.isDirectory ? '-' : formatFileSize(entry.compressedSize)}</FileSize>
                            <FileDate>{formatDate(entry.date)}</FileDate>
                        </FileItem>
                    ))}
                </FileList>
            </ContentWrapper>
        </Container>
    )
}

export default ArchivePreview
