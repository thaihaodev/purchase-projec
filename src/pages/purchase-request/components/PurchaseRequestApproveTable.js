import {
    EyeOutlined,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { Button, Card, Flex, Table, Tooltip, Popconfirm } from 'antd';
import dayjs from "dayjs";
import { useState } from "react";
import { dataListDetailRequest } from "../../data/fakeData";
import { roleUser } from "../../data/fakeRole"


const PurchaseRequestApproveTable = () => {
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
            width: roleUser.roleId === 1 ? 100 : 50,
            render: (val) => {
                return (
                    <Flex horizontal="true" gap="small" justify='center'>
                        <>
                            <Tooltip title="Xem Yêu Cầu">
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                //Khi Role là 1 thì chỉ xem YC và duyệt hoặc từ chối, còn khác 1 thì có thể sửa Yêu Cầu
                                // onClick={() => showModalForm("Edit", val)}
                                ></Button>
                            </Tooltip>
                            {
                                roleUser.roleId === 1 && (
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
                                )
                            }
                        </>
                    </Flex>
                );
            },
        },
        {
            title: 'User Request',
            dataIndex: 'user',
            key: 'user',
            width: 150,
        },
        {
            title: 'Title Request',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
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
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataListDetailRequest}
                bordered
                pagination={{
                    ...tableParams.pagination,
                    total: dataListDetailRequest.length, // Tổng số dòng
                    showSizeChanger: true,
                }}
                rowKey={(record) => record.key}
                onChange={handleTableChange}
                scroll={{
                    x: 1800,
                    y: "calc(100vh - 230px)",
                    scrollToFirstRowOnChange: true,
                }}
            />
        </>
    );
}

export default PurchaseRequestApproveTable;