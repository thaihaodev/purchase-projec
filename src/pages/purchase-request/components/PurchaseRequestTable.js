import {
    EyeOutlined,
    SendOutlined
} from "@ant-design/icons";
import { Button, Card, Flex, Table, Tooltip, Popconfirm, Modal } from 'antd';
import dayjs from "dayjs";
import { useState } from "react";
import { dataListDetailRequest } from "../../data/fakeData";
import UpdatePurchaseRequestModal from "./UpdatePurchaseRequestModal";

const PurchaseRequestTable = () => {
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    //Hàm mở modal
    const handleViewUpdateRequest = (record) => {
        setSelectedRecord(record); // Lưu record
        setModalVisible(true); // Hiển thị modal
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRecord(null); // Xóa record khi đóng modal
    };

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 100,
        },
    });
    const onSelectChange = (newSelectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const handleClearRows = () => {
        setSelectedRows([]);
        setSelectedRowKeys([]);
    };

    //Gửi Yêu Cầu
    const handleSendConfirmRequest = () => {
        console.log('Gửi Yêu Cầu');
    }
    // Cột của bảng
    const columns = [
        {
            title: "Action",
            key: "operation",
            fixed: "left",
            width: 70,
            render: (val, record) => {
                return (
                    <Flex horizontal="true" gap="small" justify='center'>
                        <>
                            <Tooltip title="Xem/Cập Nhật Yêu Cầu">
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    onClick={() => handleViewUpdateRequest(record)}
                                ></Button>
                            </Tooltip>
                            <Tooltip title="Gửi Yêu Cầu">
                                <Popconfirm
                                    title="Gửi Xác Nhận Yêu Cầu"
                                    description={<>Bạn có chắc chắn muốn gửi yêu cầu?</>}
                                    onConfirm={() => handleSendConfirmRequest()}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button size="small" icon={<SendOutlined />}></Button>
                                </Popconfirm>
                            </Tooltip>
                        </>
                    </Flex>
                );
            },
        },
        {
            title: 'User Request',
            dataIndex: 'userRequest',
            key: 'userRequest',
            width: 150,
        },
        {
            title: 'Title Request',
            dataIndex: 'titleRequest',
            key: 'titleRequest',
            width: 300,
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 300,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            width: 150,
            render: (progress) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100px", backgroundColor: "#f5f5f5" }}>
                        <div
                            style={{
                                width: `${progress}%`,
                                height: "15px",
                                backgroundColor: "#1890ff",
                            }}
                        ></div>
                    </div>
                    <div style={{ marginLeft: "5px" }}>{progress}</div>
                </div>
            ),
        },
        {
            title: 'Create Time',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 150,
            render: (val, record) => {
                return (
                    <div>
                        {record && record.createTime ? dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") : ""}
                    </div>
                );
            },
        },
        {
            title: 'Update Time',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: 150,
            render: (val, record) => {
                return (
                    <div>
                        {record && record.updateTime ? dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") : ""}
                    </div>
                );
            },
        },
        {
            title: 'Date Send Manager',
            dataIndex: 'dateSendManager',
            key: 'dateSendManager',
            width: 150,
            render: (val, record) => {
                return (
                    <div>
                        {record && record.dateSendManager ? dayjs(record.dateSendManager).format("YYYY-MM-DD HH:mm:ss") : ""}
                    </div>
                );
            },
        },
    ];

    const handleTableChange = (pagination) => {
        // Cập nhật tableParams khi thay đổi phân trang
        setTableParams({
            ...tableParams,
            pagination,
        });
    };

    return (
        <>
            <Table
                size='small'
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={dataListDetailRequest}
                bordered
                pagination={{
                    ...tableParams.pagination,
                    total: dataListDetailRequest.length, // Tổng số dòng
                    showSizeChanger: true,
                }}
                rowKey={(record) => record.id}
                onChange={handleTableChange}
                scroll={{
                    x: 1600,
                    y: "calc(100vh - 230px)",
                    scrollToFirstRowOnChange: true,
                }}
            />
            <Modal
                title="Cập Nhật Yêu Cầu"
                style={{
                    top: 20,
                }}
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={1400}
            >
                <UpdatePurchaseRequestModal
                    dataItem={selectedRecord}
                    onClose={handleCloseModal}
                />
            </Modal>
        </>
    );
}

export default PurchaseRequestTable;