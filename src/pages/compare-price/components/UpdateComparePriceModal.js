import React, { useState, useEffect, Children } from "react";
import { Button, Select, Input, Table, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload, Popconfirm } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, MergeCellsOutlined, UploadOutlined } from "@ant-design/icons";
import "../style.css"
import { v4 as uuidv4 } from 'uuid';
import { formatNameFileUpload } from "../../../utils/helpers"
// import UpdateQuoteTable from './UpdateQuoteTable';
const { Option } = Select;

const UpdateComparePriceModal = (props) => {
    const [isMore, setIsMore] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [listComparePrice, setListComparePrice] = useState([]);
    const [listPOTemp, setListPOTemp] = useState([]);

    const handleDeleteRow = (id) => {
        const newDetails = listComparePrice.filter((record) => record.id !== id);
        setListComparePrice(newDetails);
    };

    const columnsComparePrice = [
        {
            title: "Action",
            key: "operation",
            fixed: "left",
            width: 70,
            render: (_, record, index) => {
                return (
                    <Flex horizontal="true" gap="small" justify='center'>
                        <>
                            <Tooltip title="Delete">
                                <Button
                                    style={{ color: 'red' }}
                                    size="small"
                                    icon={<CloseOutlined />}
                                    onClick={() => handleDeleteRow(record.id)}
                                ></Button>
                            </Tooltip>
                        </>
                    </Flex>
                );
            },
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: 180,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 180,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 180,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            width: 180,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 180,
        },
        {
            title: "NCC1",
            children: [
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    width: 180,
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                    width: 180,
                },
                {
                    title: "Last Price",
                    dataIndex: "lastPrice",
                    key: "lastPrice",
                    width: 180,
                },
                {
                    title: "Money Without Tax",
                    dataIndex: "moneyWithoutTax",
                    key: "moneyWithoutTax",
                    width: 180,
                },
                {
                    title: "Tax",
                    dataIndex: "tax",
                    key: "tax",
                    width: 180,
                },
                {
                    title: "Money With Tax",
                    dataIndex: "moneyWithTax",
                    key: "moneyWithTax",
                    width: 180,
                },
                {
                    title: "Rate",
                    dataIndex: "rate",
                    key: "rate",
                    width: 180,
                },
            ]
        }
    ];

    const handleSubmit = async () => {
        try {
            const formValues = await form.validateFields();
            const listUpload = fileList.map(file => file.originFileObj);
            const payload = await {
                ...formValues,
                status: "Sourcing",
                progress: 10,
                userRequest: "Hảo Đẹp Trai",
                id: uuidv4(),
                listUpload: listUpload,
                listData: listComparePrice.map((detail, index) => ({
                    ...detail,
                })),
            };
        }
        catch (error) {
            message.error("Vui lòng hoàn thành các trường bắt buộc trong form!");
        }
    }

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <Card className="compare-price-modal">
            <Form form={form} layout="vertical">
                <Row>
                    <Col span={24}>
                        <Table
                            className="create-quote-table-detail"
                            locale={{ emptyText: "No data" }}
                            // dataSource={listItemQuoteRequest}
                            columns={columnsComparePrice}
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
                    </Col>
                </Row>
                <Row>
                    {/* Nút Upload */}
                    <Col span={24}>
                        <Form.Item label="Upload File Đính Kèm">
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {/* Nút Upload */}
                                <Upload
                                    onChange={handleUploadChange}
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
                    <Col span={24}>
                        <Form.Item
                            label="Note"
                            name="note"
                        >
                            <Input.TextArea
                                rows={2}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Flex gap="small" justify="end" style={{ alignItems: "center" }}>
                            <Button type="primary">Cập Nhật</Button>
                        </Flex>
                    </Col>

                </Row>
            </Form>
        </Card >
    );
};

export default UpdateComparePriceModal;