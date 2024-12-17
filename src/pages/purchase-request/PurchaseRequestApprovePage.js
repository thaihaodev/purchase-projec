////Không dùng nữa
import {
    EyeOutlined,
    CloseOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, message, Row, Select, Table, Tooltip, Popconfirm, Modal, Flex } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import "antd/dist/reset.css";
import { dataListDetailRequest } from "../data/fakeData"; // Import data giả
import { roleUser } from "../data/fakeRole";
import CreateQuoteRequestModal from "../quote-request/components/CreateQuoteRequestModal";
import WatchPurchaseRequestModal from "./components/WatchPurchaseRequestModal";
import UpdatePurchaseRequestModal from "./components/UpdatePurchaseRequestModal";

const { RangePicker } = DatePicker;

const PurchaseRequestApprovePage = () => {
    const now = dayjs();
    const [fromDate, setFromDate] = useState(now.format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(now.format("YYYY-MM-DD"));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [modalVisibility, setModalVisibility] = useState({
        createPurchaseRequestModal: false,
        createQuoteRequestModal: false,
    });

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 100,
        },
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleDateChange = (dates) => {
        if (dates) {
            const fromDate = dates[0];
            const toDate = dates[1];
            const maxRange = 31;
            if (toDate && toDate.diff(fromDate, "day") > maxRange) {
                message.error("Khoảng thời gian không được vượt quá 31 ngày!");
            } else {
                setFromDate(fromDate.format("YYYY-MM-DD"));
                setToDate(toDate.format("YYYY-MM-DD"));
            }
        } else {
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
        setSelectedRows(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleClearRows = () => {
        setSelectedRows([]);
        setSelectedRowKeys([]);
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

    const columns = [
        {
            title: "Action",
            key: "operation",
            fixed: "left",
            width: roleUser.roleId === 1 ? 100 : 50,
            render: (val, record) => (
                <Flex horizontal="true" gap="small" justify="center">
                    <Tooltip title={roleUser.roleId === 1 ? "Xem Yêu Cầu" : "Xem/Cập Nhật Yêu Cầu"}>
                        <Button
                            size="small"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewUpdateRequest(record)}
                        />
                    </Tooltip>
                    {roleUser.roleId === 1 && (
                        <>
                            <Tooltip title="Duyệt Yêu Cầu">
                                <Popconfirm
                                    title="Xác Nhận Duyệt Yêu Cầu"
                                    onConfirm={() => console.log("Xác nhận duyệt")}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button size="small" icon={<CheckOutlined />} />
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip title="Từ Chối Yêu Cầu">
                                <Popconfirm
                                    title="Xác Nhận Từ Chối Yêu Cầu"
                                    onConfirm={() => console.log("Từ chối yêu cầu")}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button size="small" icon={<CloseOutlined />} />
                                </Popconfirm>
                            </Tooltip>
                        </>
                    )}
                </Flex>
            ),
        },
        // Các cột khác
        {
            title: "User Request",
            dataIndex: "userRequest",
            key: "userRequest",
        },
        {
            title: "Title Request",
            dataIndex: "titleRequest",
            key: "titleRequest",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    return (
        <div>
            <Row justify="space-between" align="middle" gutter={16} className="toolbar">
                <Col>
                    <RangePicker
                        defaultValue={[now, now]}
                        onChange={handleDateChange}
                        style={{ marginRight: 10 }}
                    />
                    {roleUser.roleId !== 1 && (
                        <Button onClick={() => toggleModal("createQuoteRequestModal", true)} type="primary">
                            Create Quote
                        </Button>
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
                <Table
                    size="small"
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataListDetailRequest}
                    bordered
                    pagination={{
                        ...tableParams.pagination,
                        total: dataListDetailRequest.length,
                    }}
                    rowKey={(record) => record.id}
                    onChange={handleTableChange}
                />
            </div>
            <Modal
                title="Yêu Cầu Báo Giá"
                style={{ top: 50 }}
                open={modalVisibility.createQuoteRequestModal}
                onCancel={() => toggleModal("createQuoteRequestModal", false)}
                footer={null}
                width={1200}
            >
                <CreateQuoteRequestModal listRequest={selectedRows} handleClearRows={handleClearRows} />
            </Modal>
            <Modal
                title={roleUser.roleId === 1 ? "Danh Sách Yêu Cầu Mua Hàng" : "Cập Nhật Yêu Cầu"}
                style={{ top: 50 }}
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={1200}
            >
                {roleUser.roleId === 1 ? (
                    <WatchPurchaseRequestModal
                        dataItem={selectedRecord}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <UpdatePurchaseRequestModal
                        dataItem={selectedRecord}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default PurchaseRequestApprovePage;
