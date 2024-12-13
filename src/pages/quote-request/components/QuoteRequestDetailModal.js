import React, { useState, useEffect } from "react";
import { Button, Select, Input, Table, Tabs, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload, Radio } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, MergeCellsOutlined } from "@ant-design/icons";
import "../style.css"
import { v4 as uuidv4 } from 'uuid';
import UpdateQuoteTable from './UpdateQuoteTable';
const { Option } = Select;

const QuoteRequestDetailModal = (props) => {
    const { dataItem } = props;
    const [form] = Form.useForm();
    const [reason, setReason] = useState("");
    const [listItemQuoteRequest, setListItemQuoteRequest] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const Validate = {
        TitleQuote: [
            {
                required: true,
                message: "Không được để trống",
            },
        ],
    };

    useEffect(() => {
        (async () => {
            if (dataItem) {
                let dataObj = {
                    titleQuote: dataItem.titleQuote,
                    note: dataItem.note,
                };
                form.setFieldsValue(dataObj);
                setListItemQuoteRequest(dataItem.listItems);
            }
        })();
    }, [dataItem, form]);

    const columns = [
        {
            title: "ItemID",
            dataIndex: "itemId",
            key: "itemId",
            width: 180,
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "dept",
            width: 180,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 180,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 180,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 180,
        },
    ];

    const handleReset = () => {
        form.resetFields(); // Reset các giá trị trong form
        setReason("");
        setListItemQuoteRequest([]); // Clear danh sách chi tiết
        setFileList([]);
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // Xử lý gửi yêu cầu
    const handleSubmit = async () => {
        try {
            const formValues = await form.validateFields();
            // Lấy dữ liệu từ form
            const { titleQuote, note } = formValues;

            const payload = {
                ...formValues,
                userQuote: "Hảo Đẹp Trai",
                id: uuidv4(),
                listItemQuoteRequest: listItemQuoteRequest
                // listItemQuoteRequest: listItemQuoteRequest.map((detail, index) => ({
                //     ...detail,
                // })),
            };

            console.log("Payload gửi đi:", payload);
            message.success("Gửi yêu cầu thành công!");
            handleReset();
        }
        catch (error) {
            message.error("Vui lòng hoàn thành các trường bắt buộc trong form!");
        }
    };

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
    };

    return (
        <Card className="quote-request-detail-modal">
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Title" name="titleQuote" rules={Validate.TitleQuote} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                </Row>
            </Form>
            {/* Chi tiết các thiết bị */}
            <Row>
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
            <Table
                style={{ margin: "16px 0" }}
                className="create-quote-table-detail"
                locale={{ emptyText: "No data" }}
                dataSource={listItemQuoteRequest}
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
            <Row gutter={16}>
                <Col span={24}>
                    <Radio.Group onChange={handleSupplierChange}>
                        {dataItem?.listSupplier?.map((supplier) => (
                            <Radio key={supplier.id} value={supplier.id}>
                                {supplier.supplierName}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Col>
            </Row>
            {
                selectedSupplier &&
                (<Row gutter={16} style={{ marginTop: '8px' }}>
                    <Col span={24}>
                        <UpdateQuoteTable selectedSupplier={selectedSupplier} />
                    </Col>
                </Row>)
            }
            <Row gutter={16}>
                <Col span={24}>
                    <Button type="primary" style={{ float: 'right', marginTop: '20px' }} onClick={handleSubmit}>
                        Compare
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default QuoteRequestDetailModal;
