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
            label: 'Danh Sách Yêu Cầu Mua Hàng',
            key: '1',
            children: <PurchaseRequestPage />,
        },
        // {
        //     label: 'PR cần duyệt',
        //     key: '2',
        //     children: <PurchaseRequestApprovePage />,
        // },
        {
            label: 'Danh Sách Yêu Cầu Báo Giá',
            key: '2',
            children: <QuoteRequestPage />,
        },
        {
            label: 'Danh Sách So Sánh Giá',
            key: '3',
            children: <ComparePricePage />,
        },
        {
            label: 'Danh Sách Phê Duyệt',
            key: '4',
            children: <ApproveSupplierPage />,
        },
        {
            label: 'Danh Sách Purchase Order',
            key: '5',
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