import { Button, Col, DatePicker, message, Row, Select, Modal, Tabs } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import PurchaseRequestPage from "./PurchaseRequestPage";
import PurchaseRequestApprovePage from "./PurchaseRequestApprovePage";

const PurchasePage = () => {
    return (
        <div className="app-container">
            <Tabs size="small">
                <Tabs.TabPane tab="PR của tôi" key="1">
                    <PurchaseRequestPage />
                </Tabs.TabPane>
                <Tabs.TabPane tab="PR cần duyệt" key="2">
                    <PurchaseRequestApprovePage />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default PurchasePage;