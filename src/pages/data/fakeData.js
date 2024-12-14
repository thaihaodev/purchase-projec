export const dataListDetailRequest = [
    {
        id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        userRequest: "Hảo đẹp trai",
        titleRequest: "Phòng IT mua VPP",
        typeRequest: "mua-sam",
        monthRequest: "202412",
        reason: "Sử dụng",
        note: "Mua cho đầy đủ",
        status: "Sourcing",
        progress: 10,
        createTime: "2024-12-02T17:31:09.2704834",
        updateTime: "2024-12-02T17:31:53.6463451",
        dateSendManager: "2024-12-02T17:31:53.6463451",
        listDetailRequests: [
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac1",
                chain: "TBSL_CFS_1-4",
                dept: "BD",
                costName: "Cost1",
                account: "Minh Thái 1",
                customer: "MINH THÁI",
                customer: "Minh Thái 1",
                item: "Vở",
                qty: "10",
                unit: "1",
                brand: "1",
                sizeType: "S"
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac2",
                chain: "TBSL_CFS_5",
                dept: "BT",
                costName: "Cost2",
                account: "AMI 1",
                customer: "MINH THÁI",
                item: "Sách",
                qty: "5",
                unit: "1",
                brand: "1",
                sizeType: "L"
            }
        ]
    },
    {
        id: "e1a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        userRequest: "Hảo đẹp trai",
        titleRequest: "DEV sửa hàng",
        typeRequest: "sua-chua",
        monthRequest: "202412",
        reason: "Sử dụng chung",
        note: "Thu mua hàng",
        status: "Waiting Approve",
        progress: 60,
        createTime: "2024-12-02T17:31:09.2704834",
        updateTime: "2024-12-02T17:31:53.6463451",
        dateSendManager: "2024-12-02T17:31:53.6463451",
        listDetailRequests: [
            {
                id: "e7a3afdf-28dd-4889-9e4d-bf2a54a99ac7",
                chain: "TBSL_CFS_7-8",
                dept: "DA",
                costName: "Cost3",
                account: "Minh Thái 3",
                customer: "MINH THÁI",
                item: "Vở",
                qty: "10",
                unit: "1",
                brand: "1",
                sizeType: "S"
            },
            {
                id: "e7a4af5f-28dd-4889-9e4d-bf2a54a99ac7",
                chain: "TBSL_DC_ST",
                dept: "FWD",
                costName: "Cost5",
                account: "AMI 8",
                customer: "MINH THÁI",
                item: "Sách",
                qty: "5",
                unit: "1",
                brand: "1",
                sizeType: "L"
            }
        ]
    }
];

export const dataListQuoteRequest = [
    {
        id: "c7a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        titleQuote: "Yêu cầu báo giá 1",
        createTime: "2024-12-02T17:31:09.2704834",
        status: "Waiting Product Quote",
        listItems: [
            {
                id: "c7a4afdf-28dd-1889-9e4d-bf2a54a99ac7",
                itemId: "IT1",
                item: "Bút",
                unit: "Cây",
                size: "",
                qty: "20"
            },
            {
                id: "c7a4afdf-38dd-4889-9e4d-bf2a54a99ac7",
                itemId: "IT2",
                item: "Khăn ướt",
                unit: "Bình",
                size: "",
                qty: "10"
            }
        ],
        listSupplier: [
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99acc",
                supplierName: "NCC1",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99aca",
                supplierName: "NCC2",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99acq",
                supplierName: "NCC3",
            }
        ]
    },
    {
        id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        titleQuote: "Yêu cầu báo giá 2",
        createTime: "2024-12-02T17:31:09.2704834",
        status: "Waiting Manager Approver",
        listItems: [
            {
                id: "c7a4afdf-28dd-4889-1e4d-bf2a54a99ac7",
                itemId: "IT3",
                item: "Bút",
                unit: "Cây",
                size: "",
                qty: "20"
            },
            {
                id: "c7a4afdf-28dd-4889-9e4d-bf2a54a19ac7",
                itemId: "IT4",
                item: "Khăn ướt",
                unit: "Bình",
                size: "",
                qty: "10"
            }
        ],
        listSupplier: [
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac1",
                supplierName: "NCC4",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac2",
                supplierName: "NCC5",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac3",
                supplierName: "NCC6",
            }
        ]
    },
]

//Cập nhật bảng báo giá
export const listItemQuoteBySupplier =
{
    id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99acc",
    supplierName: "NCC1",
    note: "",
    listItems: [
        {
            id: "c7a4afdf-28dd-1889-9e4d-bf2a54a99ac7",
            itemId: "IT1",
            item: "Bút",
            unit: "Cây",
            size: "",
            qty: "20",
            price: "",
            deal: "",
            tax: "",
        },
        {
            id: "c7a4afdf-38dd-4889-9e4d-bf2a54a99ac7",
            itemId: "IT2",
            item: "Khăn ướt",
            unit: "Bình",
            size: "",
            qty: "10",
            price: "",
            deal: "",
            tax: "",
        }
    ],
}

export const dataListComparePrice = [
    {
        id: "c7a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        titleCompare: "Yêu cầu báo giá 1",
        createTime: "2024-12-02T17:31:09.2704834",
        status: "Waiting Product Quote",
        listItems: [
            {
                id: "c7a4afdf-28dd-1889-9e4d-bf2a54a99ac7",
                itemId: "IT1",
                item: "Bút",
                unit: "Cây",
                size: "",
                qty: "20"
            },
            {
                id: "c7a4afdf-38dd-4889-9e4d-bf2a54a99ac7",
                itemId: "IT2",
                item: "Khăn ướt",
                unit: "Bình",
                size: "",
                qty: "10"
            }
        ],
        listSupplier: [
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99acc",
                supplierName: "NCC1",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99aca",
                supplierName: "NCC2",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99acq",
                supplierName: "NCC3",
            }
        ]
    },
    {
        id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac7",
        titleCompare: "Yêu cầu báo giá 2",
        createTime: "2024-12-02T17:31:09.2704834",
        status: "Waiting Manager Approver",
        listItems: [
            {
                id: "c7a4afdf-28dd-4889-1e4d-bf2a54a99ac7",
                itemId: "IT3",
                item: "Bút",
                unit: "Cây",
                size: "",
                qty: "20"
            },
            {
                id: "c7a4afdf-28dd-4889-9e4d-bf2a54a19ac7",
                itemId: "IT4",
                item: "Khăn ướt",
                unit: "Bình",
                size: "",
                qty: "10"
            }
        ],
        listSupplier: [
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac1",
                supplierName: "NCC4",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac2",
                supplierName: "NCC5",
            },
            {
                id: "e7a4afdf-28dd-4889-9e4d-bf2a54a99ac3",
                supplierName: "NCC6",
            }
        ]
    },
]