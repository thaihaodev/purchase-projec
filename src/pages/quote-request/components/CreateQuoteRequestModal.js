import React, { useState, useEffect } from "react";
import { Button, Select, Input, Table, Tabs, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, MergeCellsOutlined, SplitCellsOutlined } from "@ant-design/icons";
import "../style.css"
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const CreateQuoteRequestModal = (props) => {
    const { listRequest, handleClearRows } = props;
    const [form] = Form.useForm();
    const [month, setMonth] = useState("");
    const [monthOptions, setMonthOptions] = useState([]);
    const [reason, setReason] = useState("");
    const [listDetailQuote, setListDetailQuote] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isMerge, setIsMerge] = useState(false);

    const Validate = {
        TitleQuote: [
            {
                required: true,
                message: "Không được để trống",
            },
        ],
        TypeRequest: [
            {
                required: true,
                message: "Không được để trống",
            },
        ],
    };
    useEffect(() => {
        if (listRequest && listRequest.length > 0) {
            const allDetails = listRequest.flatMap(request => request.listDetailRequests);
            setListDetailQuote(allDetails);
        } else {
            setListDetailQuote([]); // Reset khi listRequest rỗng
        }
    }, [props, listRequest]);

    const generateMonthsForCurrentYear = () => {
        const currentYear = dayjs().year();
        const months = Array.from({ length: 12 }, (_, i) => ({
            value: `${currentYear}${(i + 1).toString().padStart(2, "0")}`, // Định dạng: YYYYMM
            label: `${currentYear}/${i + 1}`, // Định dạng hiển thị: Tháng X/YYYY
        }));
        return months;
    };

    useEffect(() => {
        // Tạo danh sách các tháng và đặt giá trị mặc định
        const months = generateMonthsForCurrentYear();
        setMonthOptions(months);

        // Giá trị mặc định là tháng hiện tại
        const currentMonth = dayjs().format("YYYYMM");
        setMonth(currentMonth);
    }, []);

    // Xử lý khi thay đổi tháng
    const handleMonthChange = (value) => {
        setMonth(value);
    };

    const columns = [
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

    const handleDeleteRow = (id) => {
        const newDetails = listDetailQuote.filter((record) => record.id !== id);
        setListDetailQuote(newDetails);
    };

    const handleReset = () => {
        form.resetFields(); // Reset các giá trị trong form
        setReason("");
        setMonth(dayjs().format("YYYYMM")); // Reset tháng về giá trị mặc định
        setListDetailQuote([]); // Clear danh sách chi tiết
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
            const { titleQuote, monthQuote, note, supplier } = formValues;

            const payload = {
                ...formValues,
                userQuote: "Hảo Đẹp Trai",
                id: uuidv4(),
                listDetailQuotes: listDetailQuote.map((detail, index) => ({
                    ...detail,
                })),
            };

            console.log("Payload gửi đi:", payload);
            message.success("Gửi yêu cầu thành công!");
            handleReset();
            handleClearRows();
        }
        catch (error) {
            message.error("Vui lòng hoàn thành các trường bắt buộc trong form!");
        }
    };

    return (
        <Card className="create-purchase-modal">
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Title" name="titleQuote" rules={Validate.TitleQuote} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Y/C Báo giá cho tháng:" name="monthQuote">
                            <Select
                                value={month}
                                onChange={handleMonthChange}
                                style={{ width: "100%" }}
                            >
                                {monthOptions.map((monthOption) => (
                                    <Option key={monthOption.value} value={monthOption.value}>
                                        {monthOption.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        {
                            isMerge ? (
                                <Button color="black" size="small" onClick={() => setIsMerge(false)}><SplitCellsOutlined />Gộp</Button>
                            ) :
                                (
                                    <Button color="black" size="small" onClick={() => setIsMerge(true)}><MergeCellsOutlined />Gộp</Button>
                                )
                        }
                    </Col>
                    <Col span={24}>
                        <Table
                            style={{ margin: "10px 0" }}
                            className="create-quote-table-detail"
                            locale={{ emptyText: "No data" }}
                            dataSource={listDetailQuote}
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
                    <Col span={24}>
                        <Form.Item label="Nhà cung cấp" name="supplier">
                            <Select
                                mode="multiple"
                                allowClear
                            >
                                {monthOptions.map((monthOption) => (
                                    <Option key={monthOption.value} value={monthOption.value}>
                                        {monthOption.label}
                                    </Option>
                                ))}
                            </Select>
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
                        <Button type="primary" style={{ float: 'right', marginTop: '10px' }} onClick={handleSubmit}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default CreateQuoteRequestModal;
