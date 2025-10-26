import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ImagePreview from './Renderers/ImagePreview/ImagePreview'
import VideoPreview from './Renderers/VideoPreview/VideoPreview'
import PdfPreview from './Renderers/PdfPreview/PdfPreview'
import TextPreview from './Renderers/TextPreview/TextPreview'
import FallbackPreview from './Renderers/FallbackPreview/FallbackPreview'
import AudioPreview from './Renderers/AudioPreview/AudioPreview'
import WordPreview from './Renderers/WordPreview/WordPreview'
import ExcelPreview from './Renderers/ExcelPreview/ExcelPreview'
import CsvPreview from './Renderers/CsvPreview/CsvPreview'
import ArchivePreview from './Renderers/ArchivePreview/ArchivePreview'

interface FilePreveyeProps {
    file: File | Blob
    container?: HTMLElement | null
    fileName?: string
}

const PreviewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`

const FilePreveye: React.FC<FilePreveyeProps> = ({ file, container, fileName }) => {
    const portalRoot = useRef<HTMLDivElement | null>(null)
    const fileType = file.type || 'application/octet-stream'
    const previewFileName = file instanceof File ? file.name : (fileName ?? 'blob-file')

    const isTextFile = (fileName: string): boolean => {
        const textExtensions = [
            // Code files
            'js',
            'jsx',
            'ts',
            'tsx',
            'py',
            'java',
            'c',
            'cpp',
            'cs',
            'php',
            'rb',
            'go',
            'rs',
            'swift',
            'kt',
            'scala',
            'sh',
            'bash',
            'ps1',
            'r',
            'sql',
            'pl',
            'lua',
            'dart',
            'vue',
            // Web files
            'html',
            'htm',
            'css',
            'scss',
            'sass',
            'less',
            // Config/data files
            'json',
            'xml',
            'yaml',
            'yml',
            'toml',
            'ini',
            'conf',
            'config',
            // Markup/documentation
            'md',
            'markdown',
            'rst',
            'tex',
            'txt',
            'log',
            // Other
            'gitignore',
            'env',
            'dockerfile',
            'makefile',
        ]

        const ext = fileName.toLowerCase().split('.').pop() || ''
        return textExtensions.includes(ext)
    }

    const isArchiveFile = (fileName: string): boolean => {
        const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz']
        const ext = fileName.toLowerCase().split('.').pop() || ''
        return archiveExtensions.includes(ext)
    }

    const renderPreview = () => {
        if (fileType.startsWith('image/')) {
            return <ImagePreview file={file} fileName={previewFileName} />
        }

        if (fileType.startsWith('video/')) {
            return <VideoPreview file={file} />
        }

        if (fileType.startsWith('audio/')) {
            return <AudioPreview file={file} fileName={previewFileName} />
        }

        if (fileType === 'application/pdf') {
            return <PdfPreview file={file} fileName={previewFileName} />
        }

        if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            previewFileName.toLowerCase().endsWith('.docx')
        ) {
            return <WordPreview file={file} fileName={previewFileName} />
        }

        if (
            fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            fileType === 'application/vnd.ms-excel' ||
            previewFileName.toLowerCase().endsWith('.xlsx') ||
            previewFileName.toLowerCase().endsWith('.xls')
        ) {
            return <ExcelPreview file={file} fileName={previewFileName} />
        }

        if (fileType === 'text/csv' || previewFileName.toLowerCase().endsWith('.csv')) {
            return <CsvPreview file={file} fileName={previewFileName} />
        }

        if (
            fileType === 'application/zip' ||
            fileType === 'application/x-zip-compressed' ||
            fileType === 'application/x-rar-compressed' ||
            fileType === 'application/x-7z-compressed' ||
            isArchiveFile(previewFileName)
        ) {
            return <ArchivePreview file={file} fileName={previewFileName} />
        }

        if (fileType.startsWith('text/') || fileType === 'application/json' || isTextFile(previewFileName)) {
            return <TextPreview file={file} fileName={previewFileName} />
        }

        return <FallbackPreview file={file} fileName={previewFileName} fileType={fileType} />
    }

    const previewContent = <PreviewContainer>{renderPreview()}</PreviewContainer>

    if (container) {
        if (!portalRoot.current) {
            portalRoot.current = document.createElement('div')
            portalRoot.current.style.width = '100%'
            portalRoot.current.style.height = '100%'
        }

        useEffect(() => {
            if (container && portalRoot.current) {
                container.appendChild(portalRoot.current)
                return () => {
                    if (portalRoot.current && container.contains(portalRoot.current)) {
                        container.removeChild(portalRoot.current)
                    }
                }
            }
        }, [container])

        return portalRoot.current ? ReactDOM.createPortal(previewContent, portalRoot.current) : null
    }

    return previewContent
}

export default FilePreveye
