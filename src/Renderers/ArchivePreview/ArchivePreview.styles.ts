import { styled } from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f5f5f5;
`

export const ContentWrapper = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`

export const Header = styled.div`
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 12px;
`

export const ArchiveIcon = styled.span`
    font-size: 24px;
`

export const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-top: 16px;
`

export const Stat = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const StatLabel = styled.span`
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    font-weight: 500;
`

export const StatValue = styled.span`
    font-size: 18px;
    color: #333;
    font-weight: 600;
`

export const FileList = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`

export const FileListHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 120px 120px 150px;
    gap: 16px;
    padding: 12px 20px;
    background: #f8f9fa;
    border-bottom: 2px solid #e0e0e0;
    font-size: 13px;
    font-weight: 600;
    color: #555;
`

export const FileItem = styled.div<{ $isDirectory: boolean }>`
    display: grid;
    grid-template-columns: 1fr 120px 120px 150px;
    gap: 16px;
    padding: 12px 20px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    color: #333;
    transition: background 0.15s;

    &:hover {
        background: #f8f9fa;
    }

    &:last-child {
        border-bottom: none;
    }
`

export const FileName = styled.div<{ $isDirectory: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: ${(props) => (props.$isDirectory ? '600' : '400')};
    color: ${(props) => (props.$isDirectory ? '#667eea' : '#333')};
    word-break: break-all;
`

export const FileIcon = styled.span`
    font-size: 16px;
    flex-shrink: 0;
`

export const FileSize = styled.div`
    color: #666;
    text-align: right;
`

export const FileDate = styled.div`
    color: #666;
    text-align: right;
`

export const LoadingMessage = styled.div`
    padding: 60px 40px;
    text-align: center;
    color: #666;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
`

export const ErrorMessage = styled.div`
    padding: 40px;
    text-align: center;
    color: #d32f2f;
    font-size: 14px;
    background: #ffebee;
    border-radius: 8px;
    line-height: 1.6;
`

export const EmptyMessage = styled.div`
    padding: 60px 40px;
    text-align: center;
    color: #999;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
`
