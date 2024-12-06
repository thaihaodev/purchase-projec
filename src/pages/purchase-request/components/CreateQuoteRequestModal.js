import React, { useState, useEffect } from "react";
import { Button, Select, Input, Table, Tabs, Form, message, Card, Row, Col, Collapse, Flex, Tooltip } from "antd";
import dayjs from "dayjs";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import BudgetDetailTable from "./BudgetDetailTable";
import "../style.css"

const { TextArea } = Input;
const { Option } = Select;

const CreateQuoteRequestModal = () => {
    const [form] = Form.useForm();
    const [month, setMonth] = useState("");
    const [monthOptions, setMonthOptions] = useState([]);

    const [reason, setReason] = useState("");
    const [listDetailRequest, setListDetailRequest] = useState([]);
    const [files, setFiles] = useState([]);
    const [chains, setChains] = useState([]);
    const [depts, setDepts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [accountsCus, setAccountsCus] = useState([]);

    const Validate = {
        // dsTaiXe: [{ required: true, message: "Không được để trống" }],
        Title: [
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
        // Required: [
        //     {
        //         max: {
        //             value: 10,
        //             message: "Không được vượt quá 12 ký tự",
        //         },
        //         min: {
        //             value: 1,
        //             message: "Không được ít hơn 1 ký tự",
        //         },
        //         pattern: {
        //             value: /^(?![_.])(?![_.])(?!.*[_.]{2})[0-9]+(?<![_.])$/,
        //             message: "Không được chứa ký tự đặc biệt",
        //         },
        //     },
        // ],
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách chain
                const getListChains = await fetch("https://192.168.9.111:300/genaral-report/chain/chains", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU4MDI4NzIsImVtcGlkIjozMzMzMzMzMzMzLCJ1c2VybmFtZSI6Ijk5OTk5OTk5IiwiY3VzdG9tZXJJRCI6bnVsbCwiRW1haWwiOm51bGx9.Vp-jzhIwdtGC2SMXBHBc5HMepFDA9nvzxEd5LundShw",  // Thay token của bạn
                        accept: "application/json",
                    },
                });
                const chainsData = await getListChains.json();
                if (chainsData && chainsData.data && chainsData.data.length > 0) {
                    const chainsArr = chainsData.data.map((val) => ({
                        label: val.chainName,
                        value: val.chainCode,
                        text: val.chainName,
                    }));
                    setChains(chainsArr);
                }

                // Lấy danh sách dept
                const getListDepts = await fetch("https://192.168.9.111:300/hrm/department/department-by-level", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU4MDk3MzAsImVtcGlkIjozMzMzMzMzMzMzLCJ1c2VybmFtZSI6Ijk5OTk5OTk5IiwiY3VzdG9tZXJJRCI6bnVsbCwiRW1haWwiOm51bGx9.im9VopJalIHnNXt-9luEB24hfi2Owk9uzBC7p6RV9TI",
                        accept: "application/json",
                    },
                });
                const deptsData = await getListDepts.json();
                if (deptsData && deptsData.rData && deptsData.rData.length > 0) {
                    const deptsArr = deptsData.rData.map((val) => ({
                        label: val.Name,
                        value: val.DeptID,
                        text: val.Name,
                    }));
                    setDepts(deptsArr);
                }

                //Lấy danh sách customer
                const getListCustomer = await fetch("https://192.168.9.111:300/partner/custommer/list-customer", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzU5NTQwNzAsImVtcGlkIjozMzMzMzMzMzMzLCJ1c2VybmFtZSI6Ijk5OTk5OTk5IiwiY3VzdG9tZXJJRCI6bnVsbCwiRW1haWwiOm51bGx9.lsKdtCBWGy_A_ICQi0R3aSxRwWgfPLIgcxSccvYK3ac",
                        accept: "application/json",
                    },
                });
                const cusData = await getListCustomer.json();
                if (cusData && cusData.length > 0) {
                    const cusArr = cusData.map((val) => ({
                        label: val.cusCode,
                        value: val.cusCode,
                        text: val.cusName,
                    }));
                    setCustomers(cusArr);
                }
            } catch (error) {
                console.error("Lỗi rồi ní", error);
            }
        };

        fetchData();
    }, []);

    const handleOnChangeCustomer = async (val) => {
        console.log(val, 'val nè');
        if (val && Object.keys(val).length > 0) {
            // setAccountsCus([]);
            // const getListAcc = await getData(
            //     `AccountCustomer/GetListAccountSelectByCus?cusId=${val.value}`
            // );
            // if (getListAcc && getListAcc.length > 0) {
            //     var obj = [];
            //     obj.push({ label: "-- Để Trống --", value: null });
            //     getListAcc.map((val) => {
            //         obj.push({
            //             value: val.accountId,
            //             label: val.accountId + " - " + val.accountName,
            //         });
            //     });
            //     setAccountsCus(obj);
            // } else {
            //     setAccountsCus([]);
            // }
        }
    };


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
                                    onClick={() => handleDeleteRow(record.key)}
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
            render: (_, record, index) => (
                <Select
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                        )
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "").localeCompare(optionB?.label ?? "")
                    }
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    options={chains}
                    onChange={(value) => handleInputChange(value, index, "chain")}
                >
                </Select>
            ),
        },
        {
            title: "Dept",
            dataIndex: "dept",
            key: "dept",
            width: 180,
            render: (_, record, index) => (
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                        )
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "").localeCompare(optionB?.label ?? "")
                    }
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    options={depts}
                    onChange={(value) => handleInputChange(value, index, "dept")}
                >
                </Select>
            ),
        },
        {
            title: "Cost Name",
            dataIndex: "costName",
            key: "costName",
            width: 180,
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "costName")} />,
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            width: 180,
            render: (_, record, index) => (
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                        )
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "").localeCompare(optionB?.label ?? "")
                    }
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    options={customers}
                    onChange={(value) => {
                        handleInputChange(value, index, "customers")
                        handleOnChangeCustomer(value)
                    }}
                >
                </Select>
            ),
            // render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "customer")} />,
        },
        {
            title: "Account",
            dataIndex: "account",
            key: "account",
            width: 180,
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "account")} />,
        },
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            width: 180,
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "item")} />,
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            width: 100,
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "qty")} />,
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit",
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "unit")} />,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "brand")} />,
        },
        {
            title: "Size/Type",
            dataIndex: "sizeType",
            key: "sizeType",
            render: (text, record, index) => <Input defaultValue={text} onChange={(e) => handleInputChange(e.target.value, index, "sizeType")} />,
        },
    ];

    const handleAddRow = () => {
        setListDetailRequest([
            ...listDetailRequest,
            {
                key: Date.now(),
                chain: "",
                dept: "",
                costName: "",
                customer: "",
                account: "",
                item: "",
                qty: "",
                unit: "",
                brand: "",
                sizeType: "",
            },
        ]);
    };

    // Xử lý chỉnh sửa dữ liệu của từng ô
    const handleInputChange = (value, index, field) => {
        const newDetails = [...listDetailRequest];
        newDetails[index][field] = value;
        setListDetailRequest(newDetails);
    };

    const handleDeleteRow = (key) => {
        const newDetails = listDetailRequest.filter((record) => record.key !== key);
        setListDetailRequest(newDetails);
    };

    // Xử lý gửi yêu cầu
    const handleSubmit = () => {
        // Lấy dữ liệu từ form
        const formValues = form.getFieldsValue(); // Nếu dùng Form.Item với form instance
        const { title, typeRequest, monthRequest, reason, note } = formValues;

        // Lấy dữ liệu từ bảng
        const listDetailRequests = listDetailRequest.map((detail, index) => ({
            id: index,
            chain: detail.chain || "",
            dept: detail.dept || "",
            costName: detail.costName || "",
            account: detail.account || "",
            item: detail.item || "",
            qty: detail.qty || "",
            unit: detail.unit || "",
            brand: detail.brand || "",
            sizeType: detail.sizeType || "",
        }));

        // Tạo payload cuối cùng
        const payload = {
            title,
            typeRequest,
            monthRequest,
            reason,
            note,
            listDetailRequests,
        };

        console.log("Payload gửi đi:", payload);

        // Kiểm tra dữ liệu trước khi gửi
        if (!reason.trim()) {
            message.error("Vui lòng nhập lý do!");
            return;
        }

        // Gửi API hoặc xử lý tiếp
        message.success("Gửi yêu cầu thành công!");
    };


    return (
        <Card className="create-purchase-modal">
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Title" name="title" rules={Validate.Title} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Type Request" name="typeRequest" rules={Validate.TypeRequest}>
                            <Select
                                value={reason}
                                onChange={(value) => setReason(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="mua-sam">Mua sắm</Option>
                                <Option value="sua-chua">Sửa chữa</Option>
                                <Option value="tuyen-dung">Tuyển dụng</Option>
                                <Option value="khac">Khác</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Y/C Mua cho tháng:" name="monthRequest">
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
                    <Col span={12}>
                        <Form.Item label="Lý do:" name="reason">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Ghi chú/thông tin đến bộ phận thu mua"
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
            <Table
                className="create-request-table-detail"
                rowKey="key"
                locale={{ emptyText: "No data" }}
                dataSource={listDetailRequest}
                columns={columns}
                pagination={false}
                // rowKey={(record, index) => index}
                bordered
                size="small"
                scroll={{
                    x: 1500,
                    y: "calc(100vh - 230px)",
                    scrollToFirstRowOnChange: true,
                }}
            />
            <Button type="primary" size="small" onClick={handleAddRow} style={{ margin: "8px 0 16px 0" }}>
                <PlusCircleOutlined /> Append
            </Button>
            <Collapse size="small" style={{ marginBottom: "16px" }}>
                <Collapse.Panel header="Chi tiết ngân sách" key="1">
                    <BudgetDetailTable />
                </Collapse.Panel>
            </Collapse>
            <Row gutter={16}>
                <Col span={24}>
                    <Button type="primary" style={{ float: 'right' }} onClick={handleSubmit}>
                        Gửi yêu cầu
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CreateQuoteRequestModal;
