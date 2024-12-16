//Cập nhật bảng báo giá
import { listItemQuoteBySupplier } from "../../data/fakeData"
import React, { useState, useEffect } from "react";
import { Table, Input, Card, Row, Col, Button, Form, Tooltip, Upload } from "antd";
import { CloseOutlined, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { formatNameFileUpload } from "../../../utils/helpers"

const UpdateQuoteTable = (props) => {
    const { selectedSupplier } = props;
    const [form] = Form.useForm();

    //truyền id lấy được listItemQuoteBySupplier
    const [dataSource, setDataSource] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        (async () => {
            if (selectedSupplier) {
                setDataSource(listItemQuoteBySupplier.listItems);
                setFileList([]);
            }
        })();
    }, [selectedSupplier]);

    const handleInputChange = (value, record, key) => {
        const newData = dataSource.map((item) => {
            if (item.id === record.id) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setDataSource(newData);
    };

    const columns = [
        {
            title: "Item ID",
            dataIndex: "itemId",
            key: "itemId",
            width: 120,
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: 120,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 120,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 120,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 120,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: 120,
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value, record, "price")}
                />
            ),
        },
        {
            title: "Deal",
            dataIndex: "deal",
            key: "deal",
            width: 120,
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value, record, "deal")}
                />
            ),
        },
        {
            title: "Tax",
            dataIndex: "tax",
            key: "tax",
            width: 120,
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value, record, "tax")}
                />
            ),
        },
    ];

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <>
            <Card size="small" title={listItemQuoteBySupplier.supplierName}>
                <Form form={form} layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                rowKey={(record) => record.id}
                                pagination={false}
                                bordered
                                size="small"
                            />
                        </Col>
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
                                label="Ghi chú"
                                name="note"
                            >
                                <Input.TextArea
                                    rows={2}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" style={{ float: 'right', marginTop: '20px' }}>
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default UpdateQuoteTable;