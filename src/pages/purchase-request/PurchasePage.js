import { Button, Col, DatePicker, message, Row, Select, Modal, Tabs } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import PurchaseRequestPage from "./PurchaseRequestPage";
import PurchaseRequestApprovePage from "./PurchaseRequestApprovePage";
import QuoteRequestPage from "../quote-request/QuoteRequestPage"

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
    ];

    return (
        <div className="app-container">
            <Tabs size="small" items={items} />
        </div>
    )
}

export default PurchasePage;