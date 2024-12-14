import { Tabs } from "antd";
import "antd/dist/reset.css";
import React from "react";
import ApproveSupplierPage from "../approve-supplier/ApproveSupplierPage";
import ComparePricePage from "../compare-price/ComparePricePage";
import PurchaseOrderTable from "../purchase-order/PurchaseOrderPage";
import QuoteRequestPage from "../quote-request/QuoteRequestPage";
import PurchaseRequestApprovePage from "./PurchaseRequestApprovePage";
import PurchaseRequestPage from "./PurchaseRequestPage";

const PurchasePage = () => {
    const items = [
        {
            label: 'PR của tôi',
            key: '1',
            children: <PurchaseRequestPage />,
        },
        {
            label: 'PR cần duyệt',
            key: '2',
            children: <PurchaseRequestApprovePage />,
        },
        {
            label: 'List Báo Giá',
            key: '3',
            children: <QuoteRequestPage />,
        },
        {
            label: 'Danh Sách So Sánh Giá',
            key: '4',
            children: <ComparePricePage />,
        },
        {
            label: 'Danh Sách Phê Duyệt',
            key: '5',
            children: <ApproveSupplierPage />,
        },
        {
            label: 'Danh Sách Purchase Order',
            key: '6',
            children: <PurchaseOrderTable />,
        },
    ];

    return (
        <div className="app-container">
            <Tabs size="small" items={items} />
        </div>
    )
}

export default PurchasePage;