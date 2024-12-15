import {
    EyeOutlined,
    SendOutlined,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { Button, Flex, Table, Tooltip, Popconfirm, Modal } from 'antd';
import dayjs from "dayjs";
import { useState } from "react";
import { dataListDetailRequest } from "../../data/fakeData";
import UpdatePurchaseRequestModal from "./UpdatePurchaseRequestModal";
import WatchPurchaseRequestModal from "./WatchPurchaseRequestModal";
import { roleUser } from "../../data/fakeRole";

const PurchaseRequestTable = ({ onSelectChange, handleClearRows }) => {
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
 
    const rowSelection = {
        selectedRowKeys,
        // onChange: onSelectChange,
        onChange: (newSelectedRowKeys, selectedRows) => {
            setSelectedRowKeys(newSelectedRowKeys);
            onSelectChange(newSelectedRowKeys, selectedRows); // Gọi hàm từ props
        },
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    //Gửi Yêu Cầu
    const handleSendConfirmRequest = () => {
        console.log('Gửi Yêu Cầu');
    }

    const handleConfirmRequest = () => {
        //Xác Nhận Yêu Cầu
        console.log('Xác Nhận Yêu Cầu');
    }

    const handleRejectRequest = () => {
        //Từ Chối Yêu Cầu
        console.log('Từ Chối Yêu Cầu');
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
                           
                            {
                                roleUser.roleId === 1 ? (
                                    <>
                                        <Tooltip title="Duyệt Yêu Cầu">
                                            <Popconfirm
                                                title="Xác Nhận Duyệt Yêu Cầu"
                                                description={<>Bạn có chắc chắn muốn duyệt yêu cầu?</>}
                                                onConfirm={() => handleConfirmRequest()}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <Button size="small" icon={<CheckOutlined />}></Button>
                                            </Popconfirm>
                                        </Tooltip>
                                        <Tooltip title="Từ Chối Yêu Cầu">
                                            <Popconfirm
                                                title="Xác Nhận Từ Chối Yêu Cầu"
                                                description={<>Bạn có chắc chắn muốn từ chối yêu cầu?</>}
                                                onConfirm={() => handleRejectRequest()}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <Button size="small" icon={<CloseOutlined />}></Button>
                                            </Popconfirm>
                                        </Tooltip>
                                    </>
                                ) : <>
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
                            }
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
                rowSelection={roleUser.roleId !== 1 ? rowSelection : undefined}
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
                title={roleUser.roleId === 1 ? "Danh Sách Yêu Cầu Mua Hàng" : "Cập Nhật Yêu Cầu"}
                style={{ top: 20 }}
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={1400}
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
        </>
    );
}

export default PurchaseRequestTable;