import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fff;
`

export const ContentWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #fff;
`

export const Title = styled.h2`
    margin: 0 0 24px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    padding-bottom: 12px;
    border-bottom: 2px solid #e0e0e0;
`

export const Content = styled.div`
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;

    p {
        margin: 0 0 16px 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 24px 0 12px 0;
        font-weight: 600;
        color: #222;
    }

    h1 {
        font-size: 28px;
    }
    h2 {
        font-size: 24px;
    }
    h3 {
        font-size: 20px;
    }
    h4 {
        font-size: 18px;
    }
    h5 {
        font-size: 16px;
    }
    h6 {
        font-size: 14px;
    }

    ul,
    ol {
        margin: 0 0 16px 0;
        padding-left: 24px;
    }

    li {
        margin-bottom: 8px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px 12px;
        text-align: left;
    }

    th {
        background-color: #f5f5f5;
        font-weight: 600;
    }

    img {
        max-width: 100%;
        height: auto;
        margin: 16px 0;
    }

    strong {
        font-weight: 600;
    }

    em {
        font-style: italic;
    }

    blockquote {
        margin: 16px 0;
        padding-left: 16px;
        border-left: 4px solid #ddd;
        color: #666;
        font-style: italic;
    }
`

export const LoadingMessage = styled.div`
    padding: 40px;
    text-align: center;
    color: #666;
    font-size: 14px;
`

export const ErrorMessage = styled.div`
    padding: 40px;
    text-align: center;
    color: #d32f2f;
    font-size: 14px;
    background: #ffebee;
    border-radius: 8px;
    margin: 20px;
`
