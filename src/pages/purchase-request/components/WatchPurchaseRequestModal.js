import React, { useState, useEffect } from "react";
import { Button, Select, Input, Table, Tabs, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload, Popconfirm } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import BudgetDetailTable from "./BudgetDetailTable";
import { formatNameFileUpload } from "../../../utils/helpers"
import "../style.css"
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const WatchPurchaseRequestModal = (props) => {
    const { dataItem, onClose } = props;
    const [form] = Form.useForm();
    const [month, setMonth] = useState("");
    const [monthOptions, setMonthOptions] = useState([]);
    const [reason, setReason] = useState("");
    const [listDetailRequest, setListDetailRequest] = useState([]);
    const [chains, setChains] = useState([]);
    const [depts, setDepts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [accountsCus, setAccountsCus] = useState([]);
    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        (async () => {
            if (dataItem) {
                let dataObj = {
                    titleRequest: dataItem.titleRequest,
                    typeRequest: dataItem.typeRequest,
                    monthRequest: dataItem.monthRequest,
                    reason: dataItem.reason,
                    note: dataItem.note,
                    status: dataItem.status,
                    progress: dataItem.progress,
                };
                form.setFieldsValue(dataObj);
                // Đặt dữ liệu cho bảng
                const detailRequests = dataItem.listDetailRequests.map((item) => ({
                    ...item,
                    key: item.id, // Sử dụng id làm key cho các row
                }));
                setListDetailRequest(detailRequests);
            }
        })();
    }, [dataItem, form]);

    const columns = [
        {
            title: "Chain",
            dataIndex: "chain",
            key: "chain",
            width: 180,
        },
        {
            title: "Dept",
            dataIndex: "dept",
            key: "dept",
            width: 180,
        },
        {
            title: "Cost Name",
            dataIndex: "costName",
            key: "costName",
            width: 180,
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            width: 180,
        },
        {
            title: "Account",
            dataIndex: "account",
            key: "account",
            width: 180,
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: 180,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 100,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Size/Type",
            dataIndex: "sizeType",
            key: "sizeType",
        },
    ];

    // Xử lý gửi yêu cầu
    // const handleUpdate = async () => {
    //     try {
    //         const formValues = await form.validateFields();
    //         const newErrors = {};

    //         listDetailRequest.forEach((record, index) => {
    //             newErrors[index] = {};
    //             if (!record.chain) newErrors[index].chain = "Không được để trống";
    //             if (!record.dept) newErrors[index].dept = "Không được để trống";
    //             if (!record.costName) newErrors[index].costName = "Không được để trống";
    //             if (!record.customer) newErrors[index].customer = "Không được để trống";
    //             if (!record.account) newErrors[index].account = "Không được để trống";
    //         });
    //         setErrors(newErrors);

    //         const hasErrors = Object.values(newErrors).some(error => Object.keys(error).length > 0);
    //         if (hasErrors) {
    //             message.error("Vui lòng hoàn thành các trường bắt buộc!");
    //             return;
    //         }
    //         // Lấy dữ liệu từ form
    //         const { titleRequest, typeRequest, monthRequest, reason, note } = formValues;

    //         const listUpload = fileList.map(file => file.originFileObj);

    //         const payload = await {
    //             ...formValues,
    //             status: "Sourcing",
    //             progress: 10,
    //             //Này phải lấy người đăng nhập
    //             userRequest: "Hảo Đẹp Trai",
    //             id: uuidv4(),
    //             listUpload: listUpload,
    //             listDetailRequests: listDetailRequest.map((detail, index) => ({
    //                 ...detail,
    //             })),
    //         };

    //         console.log("Payload gửi đi:", payload);
    //         message.success("Gửi yêu cầu thành công!");
    //         // handleReset();
    //         // onClose();
    //     }
    //     catch (error) {
    //         message.error("Vui lòng hoàn thành các trường bắt buộc trong form!");
    //     }
    // };

    const handleConfirmRequest = () => {
        //Xác Nhận Yêu Cầu
        console.log('Xác Nhận Yêu Cầu');
    }

    const handleRejectRequest = () => {
        //Từ Chối Yêu Cầu
        console.log('Từ Chối Yêu Cầu');
    }

    return (
        <Card className="create-purchase-modal">
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Title" name="titleRequest" >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Type Request" name="typeRequest" >
                            <Select
                                disabled
                                value={reason}
                                style={{ width: "100%" }}
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Y/C Mua cho tháng:" name="monthRequest">
                            <Select
                                disabled
                                value={month}
                                style={{ width: "100%" }}
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Lý do:" name="reason">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Ghi chú/thông tin đến bộ phận thu mua"
                            name="note"
                        >
                            <Input.TextArea
                                disabled
                                rows={2}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Upload File Đính Kèm">
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {/* Nút Upload */}
                                <Upload
                                    // onChange={handleUploadChange}
                                    disabled={true}
                                    fileList={fileList}
                                    beforeUpload={() => false} // Không tự động upload
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    multiple
                                    showUploadList={false} // Ẩn danh sách mặc định của Ant Design
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                {/* Danh sách file */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    {fileList.map((file, index) => (
                                        <Tooltip title={file.name} key={file.uid}>
                                            <div
                                                key={index}
                                                className="file-upload-style"
                                            >
                                                <span className="file-name-upload">{formatNameFileUpload(file.name)}</span>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    onClick={() => {
                                                        const newFileList = fileList.filter((_, idx) => idx !== index);
                                                        setFileList(newFileList);
                                                    }}
                                                >
                                                    <CloseOutlined />
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {/* Chi tiết các thiết bị */}
            <Table
                className="create-request-table-detail"
                // rowKey="key"
                locale={{ emptyText: "No data" }}
                dataSource={listDetailRequest}
                columns={columns}
                pagination={false}
                rowKey={(record) => record?.id}
                bordered
                size="small"
                scroll={{
                    x: 1500,
                    y: "calc(100vh - 230px)",
                    scrollToFirstRowOnChange: true,
                }}
            />
            <Collapse
                size="small"
                style={{ margin: "16px 0" }}
                items={[
                    {
                        key: "1",
                        label: "Chi tiết ngân sách",
                        children: <BudgetDetailTable />,
                    },
                ]}
            />
            <Row gutter={16}>
                <Col span={24} style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Popconfirm
                        title="Xác Nhận Yêu Cầu"
                        description={<>Bạn có chắc chắn muốn xác nhận?</>}
                        onConfirm={() => handleConfirmRequest()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary">Duyệt</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Từ Chối Yêu Cầu"
                        description={
                            <Form form={form}>
                                Bạn có chắc chắn không muốn xác nhận?
                                <Form.Item name="NoteReject" label="Lý do">
                                    <Input.TextArea
                                        autoSize={{
                                            minRows: 1,
                                            maxRows: 3,
                                        }}
                                    />
                                </Form.Item>
                            </Form>
                        }
                        onConfirm={() => handleRejectRequest()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Từ Chối</Button>
                    </Popconfirm>
                </Col>
            </Row>
        </Card>
    );
};

export default WatchPurchaseRequestModal;
