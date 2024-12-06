import { Table } from "antd";
import "antd/dist/reset.css";
import React, { useRef } from "react";
import { columnSorter, getColumnSearchProps, getColumnFilterProps } from "../../../features/TableProps";

const BudgetDetailTable = () => {
    const searchInput = useRef(null);
    // Dữ liệu bảng chính
    const dataSource = [
        {
            key: "1",
            id: "1",
            dept: "VP",
            codeChain: "VP NGÀNH",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 246500000,
            payment: 0,
            remaining: 246500000,
        },
        {
            key: "2",
            id: "2",
            dept: "CTTT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 3971297500,
            payment: 0,
            remaining: 3971297500,
        },
        {
            key: "3",
            id: "3",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "4",
            id: "44",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "5",
            id: "5",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "6",
            id: "6",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "7",
            id: "7",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "8",
            id: "8",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
        {
            key: "9",
            id: "9",
            dept: "GN QT",
            codeChain: "TBSG SC",
            nameCost: "001_DỊCH VỤ MUA NGOÀI",
            budget: 6613000000,
            payment: 0,
            remaining: 6613000000,
        },
    ];

    const columns = [
        {
            title: "Code Chain",
            dataIndex: "codeChain",
            key: "codeChain",
            // fixed: 'left',
            width: 100,
            ...getColumnSearchProps('codeChain', searchInput)
        },
        {
            title: "Dept",
            dataIndex: "dept",
            key: "dept",
            // fixed: 'left',
            width: 100,
            ...getColumnSearchProps('dept', searchInput)
        },
        {
            title: "Name Cost",
            dataIndex: "nameCost",
            key: "nameCost",
            // fixed: 'left',
            width: 200,
            ...getColumnSearchProps('dept', searchInput)
        },
        {
            title: "Budget",
            dataIndex: "budget",
            key: "budget",
            ...columnSorter('budget'),
            width: 100,
            render: (budget, record) =>
                `${Math.round(budget).toLocaleString("en-US")} vnđ`
        },
        {
            title: "Payment",
            dataIndex: "payment",
            key: "payment",
            width: 60,
            render: (payment, record) =>
                payment !== 0 ? `${Math.round(payment).toLocaleString("en-US")} vnđ` : "vnđ"
        },
        {
            title: "Remaining",
            dataIndex: "remaining",
            key: "remaining",
            fixed: 'right',
            width: 100,
            render: (remaining, record) =>
                `${Math.round(remaining).toLocaleString("en-US")} vnđ`
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            size="small"
            pagination={false} // Tắt phân trang
            scroll={{
                x: 1000,
                // x: 'max-content',
                y: "calc(50vh - 205px)",
                scrollToFirstRowOnChange: true,
            }}
            summary={(pageData) => {
                const sumBudget = pageData.reduce((total, record) => total + record.budget, 0);
                const sumPayment = pageData.reduce((total, record) => total + record.payment, 0);
                const sumRemaining = pageData.reduce((total, record) => total + record.remaining, 0);
                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row className="summary-table" style={{ fontWeight: '600' }}>
                            <Table.Summary.Cell colSpan={3} index={1}>SUM</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}> {sumBudget.toLocaleString("en-US")} vnđ</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}> {sumPayment.toLocaleString("en-US")} vnđ</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}> {sumRemaining.toLocaleString("en-US")} vnđ</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                );
            }}
        />
    );
};

export default BudgetDetailTable;
