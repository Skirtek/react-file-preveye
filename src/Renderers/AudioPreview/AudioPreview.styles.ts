import { styled } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #f5f5f5;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
`

export const AudioIcon = styled.div`
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
`

export const FileName = styled.h3`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-align: center;
    word-break: break-word;
`

export const FileInfo = styled.p`
    margin: 0 0 24px 0;
    font-size: 13px;
    color: #666;
`

export const StyledAudio = styled.audio`
    width: 100%;
    max-width: 400px;
    outline: none;

    &::-webkit-media-controls-panel {
        background-color: #000;
    }
`
