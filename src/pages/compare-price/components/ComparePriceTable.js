import { Button, Card, Flex, Table, Tooltip, Popconfirm, Modal } from "antd";
import "antd/dist/reset.css";
import React, { useRef, useState } from "react";
import { columnSorter, getColumnSearchProps, getColumnFilterProps } from "../../../features/TableProps";
import { roleUser } from "../../data/fakeRole"
import { dataListComparePrice as originalDataListComparePrice } from "../../data/fakeData";
import {
    EyeOutlined,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import ComparePriceModal from "./ComparePriceModal"
import UpdateComparePriceModal from "./UpdateComparePriceModal"
import UpdateQuoteTable from "../../quote-request/components/UpdateQuoteTable";

const ComparePriceTable = () => {
    const searchInput = useRef(null);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [modalVisibility, setModalVisibility] = useState({
        viewCompareModal: false,
        viewUpdateComparePrice: false,
    });

    const toggleModal = (modalName, isOpen) => {
        setModalVisibility((prev) => ({
            ...prev,
            [modalName]: isOpen,
        }));
    };

    const handleOpenQuoteRequestDetailModal = (record) => {
        setSelectedRecord(record); // Lưu record
        toggleModal("viewCompareModal", true) // Hiển thị modal
    };

    const dataListComparePrice = originalDataListComparePrice.map((item) => {
        const suppliers = item.listSupplier || [];
        return {
            ...item,
            supplier1: suppliers[0]?.supplierName || "",
            supplier2: suppliers[1]?.supplierName || "",
            supplier3: suppliers[2]?.supplierName || "",
        };
    });

    const handleSupplierClick = (supplierId) => {
        toggleModal("viewUpdateComparePrice", true);
        setSelectedSupplierId(supplierId);
    };


    const columns = [
        {
            title: "Action",
            key: "operation",
            width: 30,
            render: (val, record) => {
                return (
                    <Flex horizontal="true" gap="small" justify='center'>
                        <>
                            <Tooltip title="Detail">
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    // onClick={() => toggleModal("detailQuoteModal", true)}
                                    onClick={() => handleOpenQuoteRequestDetailModal(record)}
                                ></Button>
                            </Tooltip>
                        </>
                    </Flex>
                );
            },
        },
        {
            title: "Title",
            dataIndex: "titleCompare",
            key: "titleCompare",
            width: 100,
            ...getColumnSearchProps('titleCompare', searchInput)
        },
        ...(Array.from({ length: 3 }, (_, index) => ({
            title: `Supplier${index + 1}`,
            dataIndex: 'supplier' + (index + 1),
            key: 'supplier' + (index + 1),
            width: 100,
            render: (text, record) => {
                const supplier = record.listSupplier?.[index];
                return supplier ? (
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSupplierClick(supplier.id)}
                    >
                        {text}
                    </span>
                ) : null;
            },
        }))),

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
                dataSource={dataListComparePrice}
                columns={columns}
                bordered
                size="small"
                pagination={false}
                scroll={{
                    x: 1000,
                    y: "calc(50vh - 205px)",
                    scrollToFirstRowOnChange: true,
                }}
            />
            <Modal
                title="So Sánh Giá"
                style={{
                    top: 20,
                }}
                open={modalVisibility.viewCompareModal}
                onCancel={() => toggleModal("viewCompareModal", false)}
                footer={null}
                width={1400}
            >
                <ComparePriceModal dataItem={selectedRecord} />
            </Modal>
            <Modal
                title="Cập Nhật Bảng Báo Giá"
                open={modalVisibility.viewUpdateComparePrice}
                onCancel={() => toggleModal("viewUpdateComparePrice", false)}
                footer={null}
                width={1000}
            >
                {/* <UpdateComparePriceModal supplierId={selectedSupplierId} /> */}
                <UpdateQuoteTable selectedSupplier={selectedSupplierId} />
            </Modal>
        </>
    );
};

export default ComparePriceTable;
