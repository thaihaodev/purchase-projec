import { Button, Col, DatePicker, message, Row, Select, Modal } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import ApproveSupplierTable from "./components/ApproveSupplierTable"
// import CreatePurchaseRequestModal from "./components/CreatePurchaseRequestModal";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ApproveSupplierPage = () => {
    const now = dayjs();
    const [fromDate, setFromDate] = useState(now.format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(now.format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateChange = (dates) => {
        if (dates) {
            const fromDate = dates[0];
            const toDate = dates[1];
            const maxRange = 31;
            if (toDate && toDate.diff(fromDate, 'day') > maxRange) {
                message.error('Khoảng thời gian không được vượt quá 31 ngày!');
            } else {
                setFromDate(fromDate.format('YYYY-MM-DD'));
                setToDate(toDate.format('YYYY-MM-DD'));
            }
        }
        else {
            setFromDate(null);
            setToDate(null);
        }
    };

    return <>
        <div>
            <Row justify="space-between" align="middle" gutter={16} className="toolbar">
                <Col>
                    <RangePicker
                        defaultValue={[now, now]}
                        onChange={handleDateChange}
                        style={{ marginRight: 10 }}
                    />
                </Col>
            </Row>
            <div className="main-content">
                <ApproveSupplierTable />
            </div>
        </div>
    </>;
}

export default ApproveSupplierPage;