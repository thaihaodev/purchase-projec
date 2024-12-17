import React, { useState, useEffect } from "react";
import { Button, Select, Input, Table, Tabs, Form, message, Card, Row, Col, Collapse, Flex, Tooltip, Upload, Radio, Modal, Checkbox } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined, MergeCellsOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "../style.css"
import { v4 as uuidv4 } from 'uuid';
import UpdateQuoteTable from './UpdateQuoteTable';
const { Option } = Select;

const QuoteRequestDetailModal = (props) => {
    const { dataItem } = props;
    const [form] = Form.useForm();
    const [listItemQuoteRequest, setListItemQuoteRequest] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isMore, setIsMore] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [supplierName, setSupplierName] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSupplierIds, setSelectedSupplierIds] = useState([]); // Lưu danh sách nhà cung cấp được chọn

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
                setSelectedSupplier(null);
            }
        })();
    }, [dataItem, form]);

    const columns = [
        ...(() => {
            if (isMore) {
                return [
                    {
                        title: "ID PR",
                        dataIndex: 'idPr',
                        key: "idPr",
                        width: 100,
                    },
                    {
                        title: "Chain",
                        dataIndex: 'chain',
                        key: "chain",
                        width: 120,
                    },
                    {
                        title: "Dept",
                        dataIndex: 'dept',
                        key: "dept",
                        width: 100,
                    },
                    {
                        title: "Account",
                        dataIndex: 'account',
                        key: "account",
                        width: 120,
                    },
                ];
            } else {
                return [];
            }
        })(),
        {
            title: "ItemID",
            dataIndex: "itemId",
            key: "itemId",
            width: 100,
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "dept",
            width: 100,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            width: 100,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            width: 100,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 100,
        },
    ];

    const handleReset = () => {
        form.resetFields(); // Reset các giá trị trong form
        setListItemQuoteRequest([]); // Clear danh sách chi tiết
        setFileList([]);
        setSelectedSupplier(null);
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

    const handleSupplierButtonClick = (supplier) => {
        setSupplierName(supplier.supplierName)
        setSelectedSupplier(supplier.id); // Cập nhật nhà cung cấp được chọn
        setIsModalVisible(true); // Mở modal
    };

    const handleCheckboxChange = (supplierId, isChecked) => {
        if (isChecked) {
            setSelectedSupplierIds((prev) => [...prev, supplierId]); // Thêm ID vào danh sách
        } else {
            setSelectedSupplierIds((prev) =>
                prev.filter((id) => id !== supplierId) // Loại bỏ ID khỏi danh sách
            );
        }
    };
    console.log(selectedSupplierIds, 'selectedSupplierIds');
    return (
        <Card className="quote-request-detail-modal">
            <Form form={form} layout="vertical">
                <Row>
                    <Col span={24}>
                        <Form.Item label="Title" name="titleQuote" rules={Validate.TitleQuote} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        {
                            isMore ? (
                                <Button color="black" size="small" onClick={() => setIsMore(false)}><MinusCircleOutlined />Less</Button>
                            ) :
                                (
                                    <Button color="black" size="small" onClick={() => setIsMore(true)}><PlusCircleOutlined />More</Button>
                                )
                        }
                    </Col>
                    <Col span={24}>
                        <Table
                            style={{ margin: "10px 0" }}
                            className="create-quote-table-detail"
                            locale={{ emptyText: "No data" }}
                            dataSource={listItemQuoteRequest}
                            columns={columns}
                            pagination={false}
                            rowKey={(record) => record?.id}
                            bordered
                            size="small"
                            scroll={{
                                x: isMore ? 1500 : 1200,
                                y: "calc(100vh - 230px)",
                                scrollToFirstRowOnChange: true,
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        {/* <Form.Item label="Nhà cung cấp" name="listSupplier">
                            {dataItem?.listSupplier?.map((supplier) => (
                                <Button key={supplier.id} onClick={() => handleSupplierButtonClick(supplier)} style={{ padding: '2px 10px', marginRight: '10px' }}>
                                    {supplier.supplierName}
                                </Button>
                            ))}
                        </Form.Item> */}
                        <Form.Item label="Nhà cung cấp" name="listSupplier">
                            {dataItem?.listSupplier?.map((supplier) => (
                                <Button key={supplier.id} style={{ padding: "2px 10px", marginRight: "10px", }}
                                    onClick={(e) => {
                                        if (e.target.tagName !== "INPUT") {
                                            handleSupplierButtonClick(supplier);
                                        }
                                    }}>
                                    <Checkbox style={{ marginRight: "8px" }} onChange={(e) => handleCheckboxChange(supplier.id, e.target.checked)} />
                                    {supplier.supplierName}
                                </Button>
                            ))}
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
                        <Button type="primary" style={{ float: 'right', marginTop: '10px' }} onClick={handleSubmit}>
                            Compare
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Modal
                title={`Cập Nhật Bảng Báo Giá ${supplierName}`}
                style={{
                    top: 70,
                }}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                <UpdateQuoteTable selectedSupplier={selectedSupplier} />
            </Modal>
        </Card>
    );
};

export default QuoteRequestDetailModal;
