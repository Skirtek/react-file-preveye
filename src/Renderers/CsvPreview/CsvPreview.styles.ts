import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f5f5f5;
`

export const ContentWrapper = styled.div`
    padding: 20px;
`

export const Title = styled.h2`
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    padding: 16px 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const TableWrapper = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: auto;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    min-width: 600px;
`

export const Thead = styled.thead`
    background: #f8f9fa;
    position: sticky;
    top: 0;
    z-index: 1;
`

export const Th = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    white-space: nowrap;

    &:last-child {
        border-right: none;
    }
`

export const Td = styled.td`
    padding: 10px 16px;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    color: #555;

    &:last-child {
        border-right: none;
    }
`

export const Tr = styled.tr`
    &:hover {
        background: #f8f9fa;
    }

    &:last-child td {
        border-bottom: none;
    }
`

export const LoadingMessage = styled.div`
    padding: 40px;
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
    margin: 20px;
`

export const EmptyMessage = styled.div`
    padding: 40px;
    text-align: center;
    color: #999;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
`
