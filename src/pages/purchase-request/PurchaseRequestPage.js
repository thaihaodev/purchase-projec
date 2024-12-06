import { Button, Col, DatePicker, message, Row, Select, Modal } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import PurchaseRequestTable from "./components/PurchaseRequestTable"
import CreatePurchaseRequestModal from "./components/CreatePurchaseRequestModal";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PurchaseRequestPage = () => {
    const now = dayjs();
    const [fromDate, setFromDate] = useState(now.format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(now.format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisibility, setModalVisibility] = useState({
        createPurchaseRequestModal: false,
        historyItemPurchased: false,
    });
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

    const toggleModal = (modalName, isOpen) => {
        setModalVisibility((prev) => ({
            ...prev,
            [modalName]: isOpen,
        }));
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
                    <Button onClick={() => toggleModal("createPurchaseRequestModal", true)} type="primary">Create Request</Button>
                </Col>
                <Col>
                    <Button>Import</Button>
                    <Button type="dashed" style={{ marginLeft: 10 }}>
                        Export
                    </Button>
                </Col>
            </Row>
            <div className="main-content">
                <PurchaseRequestTable />
            </div>
        </div>
        <Modal
            title="Yêu Cầu Mua Hàng"
            style={{
                top: 20,
            }}
            open={modalVisibility.createPurchaseRequestModal}
            onCancel={() => toggleModal("createPurchaseRequestModal", false)}
            footer={null}
            width={1400}
        >
            <CreatePurchaseRequestModal onClose={() => toggleModal("main", false)} />
        </Modal>
    </>;
}

export default PurchaseRequestPage;