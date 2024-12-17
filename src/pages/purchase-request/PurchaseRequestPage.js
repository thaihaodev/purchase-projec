import { Button, Col, DatePicker, message, Row, Select, Modal } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import PurchaseRequestTable from "./components/PurchaseRequestTable"
import CreatePurchaseRequestModal from "./components/CreatePurchaseRequestModal";
import { roleUser } from "../data/fakeRole";
import CreateQuoteRequestModal from "../quote-request/components/CreateQuoteRequestModal";
import WatchPurchaseRequestModal from "./components/WatchPurchaseRequestModal";
import UpdatePurchaseRequestModal from "./components/UpdatePurchaseRequestModal";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PurchaseRequestPage = () => {
    const now = dayjs();
    const [fromDate, setFromDate] = useState(now.format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(now.format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);


    const [modalVisibility, setModalVisibility] = useState({
        createPurchaseRequestModal: false,
        createQuoteRequestModal: false,
        updatePurchaseRequestModal: false,
        watchPurchaseRequestModal: false,
    });

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 100,
        },
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

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectedRows);
    }

    const handleClearRows = () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
    };

    const handleViewUpdateRequest = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRecord(null);
    };

    const handleTableChange = (pagination) => {
        setTableParams({
            ...tableParams,
            pagination,
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
                    {roleUser.roleId !== 1 && (
                        <>
                            <Button style={{ marginRight: "10px" }} onClick={() => toggleModal("createPurchaseRequestModal", true)} type="primary">Create Request</Button>
                            <Button onClick={() => toggleModal("createQuoteRequestModal", true)} type="primary">
                                Create Quote
                            </Button>
                        </>
                    )}
                </Col>
                <Col>
                    <Button>Import</Button>
                    <Button type="dashed" style={{ marginLeft: 10 }}>
                        Export
                    </Button>
                </Col>
            </Row>
            <div className="main-content">
                <PurchaseRequestTable
                    onSelectChange={onSelectChange}
                    handleClearRows={handleClearRows}
                />
            </div>
        </div>
        <Modal
            title="Tạo Yêu Cầu Mua Hàng"
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
        <Modal
            title="Tạo Yêu Cầu Báo Giá"
            style={{ top: 50 }}
            open={modalVisibility.createQuoteRequestModal}
            onCancel={() => toggleModal("createQuoteRequestModal", false)}
            footer={null}
            width={1200}
        >
            <CreateQuoteRequestModal listRequest={selectedRows} handleClearRows={handleClearRows} />
        </Modal>
        {/* <Modal
            title={roleUser.roleId === 1 ? "Xem Yêu Cầu Mua Hàng" : "Cập Nhật Yêu Cầu Mua Hàng"}
            style={{ top: 50 }}
            open={roleUser.roleId === 1 ? modalVisibility.watchPurchaseRequestModal : modalVisibility.updatePurchaseRequestModal}
            onCancel={() => {
                roleUser.roleId === 1 ? toggleModal("watchPurchaseRequestModal", false) : toggleModal("updatePurchaseRequestModal", false)
            }}
            footer={null}
            width={1200}
        >
            {roleUser.roleId === 1 ? (
                <WatchPurchaseRequestModal
                    dataItem={selectedRecord}
                />
            ) : (
                <UpdatePurchaseRequestModal
                    dataItem={selectedRecord}
                />
            )}
        </Modal> */}
    </>;
}

export default PurchaseRequestPage;