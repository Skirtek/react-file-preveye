import { styled } from 'styled-components'

export const Container = styled.div`
    padding: 20px;
    text-align: left;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f5f5f5;
`

export const Title = styled.h4`
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
`

export const Content = styled.pre`
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #222;
    margin: 0;
`
