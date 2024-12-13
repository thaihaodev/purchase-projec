import React, { useState, useEffect, Children } from "react";
import { Button, Select, Input, Table, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload, Popconfirm, DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, MergeCellsOutlined, UploadOutlined } from "@ant-design/icons";
import "../style.css"
import { v4 as uuidv4 } from 'uuid';
import { formatNameFileUpload } from "../../../utils/helpers"
// import UpdateQuoteTable from './UpdateQuoteTable';
const { Option } = Select;

const PurchaseOrderDetailModal = () => {
    const [isMore, setIsMore] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [dates, setDates] = useState({
        orderDate: null,
        expectedDate: null,
        actualityDate: null,
    });

    const handleDateChange = (key, date) => {
        setDates((prev) => ({ ...prev, [key]: date }));
    };
    const Validate = {
        TitleApproveSupplier: [
            {
                required: true,
                message: "Không được để trống",
            },
        ],
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const columns = [
        {
            title: "Pr Code",
            dataIndex: "prCode",
            key: "prCode",
            width: 180,
        },
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
            title: "Group Cost",
            dataIndex: "groupCost",
            key: "groupCost",
            width: 180,
        },
        {
            title: "Custom",
            dataIndex: "custom",
            key: "custom",
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
            width: 180,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 180,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 180,
        },
    ];

    const updatePO = () => { };
    return (
        <Card className="compare-price-modal">
            <Form form={form} layout="vertical">
                <Row>
                    <Col span={24}>
                        <Form.Item label="Title" name="titleComparePrice" rules={Validate.TitleComparePrice} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        {
                            isMore ? (
                                <Button color="primary" variant="outlined" size="small" onClick={() => setIsMore(false)}><MergeCellsOutlined />Less</Button>
                            ) :
                                (
                                    <Button color="primary" variant="outlined" size="small" onClick={() => setIsMore(true)}><MergeCellsOutlined />More</Button>
                                )
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table
                            style={{ margin: "16px 0" }}
                            className="create-quote-table-detail"
                            locale={{ emptyText: "No data" }}
                            // dataSource={listItemQuoteRequest}
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
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item label="Supplier" name="supplierName" initialValue="NCC">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="Approver Date" name="approverDate">
                            <DatePicker
                                style={{ width: "100%" }}
                                // value={dates.orderDate}
                                onChange={(date) => handleDateChange("approverDate", date)}
                                placeholder="Approver Date"
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="Order Date" name="orderDate">
                            <DatePicker
                                style={{ width: "100%" }}
                                // value={dates.orderDate}
                                onChange={(date) => handleDateChange("orderDate", date)}
                                placeholder="Order Date"
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="Expected Date" name="expectedDate">
                            <DatePicker
                                style={{ width: "100%" }}
                                // value={dates.expectedDate}
                                onChange={(date) => handleDateChange("expectedDate", date)}
                                placeholder="Expected Date"
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="Actuality Date" name="actualityDate">
                            <DatePicker
                                style={{ width: "100%" }}
                                value={dates.actualityDate}
                                onChange={(date) => handleDateChange("actualityDate", date)}
                                placeholder="Actuality Date"
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
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
                    <Col span={24} >
                        <Button style={{ float: 'right' }} type="primary" onClick={updatePO} >Update</Button>
                    </Col>
                </Row>
            </Form>
        </Card >
    );
}

export default PurchaseOrderDetailModal;