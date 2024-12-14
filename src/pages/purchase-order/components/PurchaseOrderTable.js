import { Button, Card, Flex, Table, Tooltip, Popconfirm, Modal } from "antd";
import "antd/dist/reset.css";
import React, { useRef, useState } from "react";
import { columnSorter, getColumnSearchProps, getColumnFilterProps } from "../../../features/TableProps";
import { roleUser } from "../../data/fakeRole"
import { dataListQuoteRequest } from "../../data/fakeData";
import {
    EyeOutlined,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import PurchaseOrderDetailModal from "./PurchaseOrderDetailModal"

const PurchaseOrderTable = () => {
    const searchInput = useRef(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalVisibility, setModalVisibility] = useState({
        purchaseOrderModal: false,
        detailQuoteModal: false,
    });

    const toggleModal = (modalName, isOpen) => {
        setModalVisibility((prev) => ({
            ...prev,
            [modalName]: isOpen,
        }));
    };

    const handleOpenPurchaseOrderModal = (record) => {
        setSelectedRecord(record); // Lưu record
        toggleModal("purchaseOrderModal", true) // Hiển thị modal
    };

    const columns = [
        {
            title: "Action",
            key: "operation",
            width: 20,
            render: (val, record) => {
                return (
                    <Flex horizontal="true" gap="small" justify='center'>
                        <>
                            <Tooltip title="Detail">
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    // onClick={() => toggleModal("detailQuoteModal", true)}
                                    onClick={() => handleOpenPurchaseOrderModal(record)}
                                ></Button>
                            </Tooltip>
                            <Tooltip title="Hủy">
                                <Popconfirm
                                    title="Xác Nhận Hủy Báo Giá"
                                    description={<>Bạn có chắc chắn muốn hủy báo giá?</>}
                                    // onConfirm={() => handleRejectRequest()}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button size="small" icon={<CloseOutlined />}></Button>
                                </Popconfirm>
                            </Tooltip>
                        </>
                    </Flex>
                );
            },
        },
        {
            title: "Title",
            dataIndex: "titleQuote",
            key: "titleQuote",
            width: 100,
            ...getColumnSearchProps('titleQuote', searchInput)
        },
        {
            title: "Create Time",
            dataIndex: "createTime",
            key: "createTime",
            width: 100,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
        },
    ];

    return (
        <>
            <Table
                dataSource={dataListQuoteRequest}
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
            />
            <Modal
                title="PO"
                style={{
                    top: 20,
                }}
                open={modalVisibility.purchaseOrderModal}
                onCancel={() => toggleModal("purchaseOrderModal", false)}
                footer={null}
                width={1400}
            >
                <PurchaseOrderDetailModal dataItem={selectedRecord} />
            </Modal>
            {/* <Modal
                title="Detail Quote"
                style={{
                    top: 20,
                }}
                open={modalVisibility.detailQuoteModal}
                onCancel={() => toggleModal("detailQuoteModal", false)}
                footer={null}
                width={1400}
            >
                <ApproveSupplierDetailModal dataItem={selectedRecord} />
            </Modal> */}
        </>
    );
};

export default PurchaseOrderTable;