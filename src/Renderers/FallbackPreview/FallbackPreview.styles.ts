import { styled } from 'styled-components'

export const Container = styled.div`
    text-align: center;
    background: #f9f9f9;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const FileIcon = styled.div`
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    background: #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #666;
`

export const InfoRow = styled.p`
    margin: 8px 0;
    font-size: 14px;
    color: #555;

    strong {
        color: #000;
        font-weight: 600;
    }
`

export const Message = styled.p`
    margin-top: 20px;
    font-size: 13px;
    color: #000;
    font-weight: bold;
    font-style: italic;
`
