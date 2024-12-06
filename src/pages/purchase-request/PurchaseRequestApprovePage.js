import { Button, Col, DatePicker, message, Row, Select, Modal } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import PurchaseRequestApproveTable from "./components/PurchaseRequestApproveTable"
import CreateQuoteRequestModal from "./components/CreateQuoteRequestModal";
import { roleUser } from "../data/fakeRole";


const { RangePicker } = DatePicker;
const { Option } = Select;

const PurchaseRequestApprovePage = () => {
    const now = dayjs();
    const [fromDate, setFromDate] = useState(now.format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(now.format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisibility, setModalVisibility] = useState({
        createPurchaseRequestModal: false,
        createQuoteRequestModal: false,
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
                    {/* Giả sử người duyệt có roleId là 1, thì không được thấy cái nút tạo Quote */}
                    {
                        roleUser.roleId !== 1 && (
                            <Button onClick={() => toggleModal("createQuoteRequestModal", true)} type="primary">Create Quote</Button>
                        )
                    }
                </Col>
                <Col>
                    <Button>Import</Button>
                    <Button type="dashed" style={{ marginLeft: 10 }}>
                        Export
                    </Button>
                </Col>
            </Row>
            <div className="main-content">
                <PurchaseRequestApproveTable />
            </div>
        </div>
        <Modal
            title="Yêu Cầu Báo Giá"
            style={{
                top: 20,
            }}
            open={modalVisibility.createQuoteRequestModal}
            onCancel={() => toggleModal("createQuoteRequestModal", false)}
            footer={null}
            width={1400}
        >
            <CreateQuoteRequestModal onClose={() => toggleModal("main", false)} />
        </Modal>
    </>;
}

export default PurchaseRequestApprovePage;