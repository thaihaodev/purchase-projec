import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, InputNumber, Row, Space, Table, DatePicker } from 'antd';
import React from 'react';
import dayjs from "dayjs";


const { RangePicker } = DatePicker;

const ToDictionary = (enumObj) => {
    return Object.keys(enumObj).map((key) => ({
        key: key,
        value: enumObj[key],
    }));
};

// {...getColumnFilterProps('dataIndex', listDataIndex)}
export const getColumnFilterProps = (dataIndex, enumOrOptions, objName) => ({
    filterSearch: true,
    filterMode: 'tree',
    filters: Array.isArray(enumOrOptions)
        ? enumOrOptions.map((e) => ({
            text: e.label,
            value: e.value,
        }))
        :
        ToDictionary(enumOrOptions).map((e) => ({
            text: e.value,
            value: e.value,
        })),
    onFilter: (value, record) => {
        const recordVal = objName ? record[objName][dataIndex] : record[dataIndex];
        return (
            recordVal &&
            recordVal.toString().toLocaleLowerCase().includes(value.toString().toLocaleLowerCase())
        );
    },
});


//{...columnSorter('dataIndex')}
export const columnSorter = (dataIndex, parentIndex, multiple, colCompare) => ({
    sortDirections: ['ascend', 'descend'],
    sorter: {
        compare: colCompare
            ? colCompare
            : (a, b) => {
                if (parentIndex) {
                    if (!a[parentIndex][dataIndex]) {
                        return -1;
                    }
                    if (!b[parentIndex][dataIndex]) {
                        return 1;
                    }
                    if (!isNaN(a[parentIndex][dataIndex]) && !isNaN(b[parentIndex][dataIndex])) {
                        return Number(a[parentIndex][dataIndex]) - Number(b[parentIndex][dataIndex]);
                    }
                    return a[parentIndex][dataIndex].toString().localeCompare(b[parentIndex][dataIndex].toString());
                } else {
                    if (!a[dataIndex]) {
                        return -1;
                    }
                    if (!b[dataIndex]) {
                        return 1;
                    }
                    if (!isNaN(a[dataIndex]) && !isNaN(b[dataIndex])) {
                        return Number(a[dataIndex]) - Number(b[dataIndex]);
                    }
                    return a[dataIndex].toString().localeCompare(b[dataIndex].toString());
                }
            },
        multiple: multiple,
    },
});

const renderSearchComponent = (setSelectedKeys, selectedKeys, confirm, clearFilters, refInput, type) => {
    switch (type) {
        case 'DATE':
            return (
                <RangePicker
                    format='DD-MM-YYYY'
                    style={{ marginBottom: 8 }}
                    onChange={(e) => {
                        setSelectedKeys([e]);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            confirm();
                        } else if (e.code === 'Escape') {
                            clearFilters();
                            confirm();
                        }
                    }}
                    value={selectedKeys[0]}
                />
            );
        case 'NUMBER':
            const range = selectedKeys.length ? selectedKeys : [[0, 0]];
            return (
                <Row justify='space-between' align='middle' style={{ width: '26rem' }}>
                    <Col span={11}>
                        <InputNumber
                            placeholder={`From`}
                            value={range[0][0]}
                            onChange={(value) => {
                                setSelectedKeys([[value, range[0][1]]]);
                            }}
                            onPressEnter={() => confirm()}
                            onKeyDown={(e) => {
                                if (e.code === 'Escape') {
                                    clearFilters();
                                    confirm();
                                }
                            }}
                        />
                    </Col>
                    <Col span={1}>
                        <ArrowRightOutlined />
                    </Col>
                    <Col span={11}>
                        <InputNumber
                            placeholder={`To`}
                            value={range[0][1]}
                            onChange={(value) => {
                                setSelectedKeys([[range[0][0], value]]);
                            }}
                            onPressEnter={() => confirm()}
                            onKeyDown={(e) => {
                                if (e.code === 'Escape') {
                                    clearFilters();
                                    confirm();
                                }
                            }}
                        />
                    </Col>
                </Row>
            );
        default:
            return (
                <Input
                    ref={refInput}
                    placeholder={`Input to search`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    onKeyDown={(e) => {
                        if (e.code === 'Escape') {
                            clearFilters();
                            confirm();
                        }
                    }}
                />
            );
    }
};

// const dateCompare = (recordValue, searchValue) => {
//     if (!recordValue || !searchValue) return false;

//     const recordDate = new Date(recordValue);
//     const searchStartDate = new Date(searchValue[0]);
//     const searchEndDate = new Date(searchValue[1]);

//     return recordDate >= searchStartDate && recordDate <= searchEndDate;
// };

//Từ ngày tới ngày
const dateCompare = (recordValue, searchValue) => {
    if (!recordValue || !searchValue) return false;

    const recordDate = dayjs(recordValue);
    const searchStartDate = dayjs(searchValue[0]).startOf('day');
    const searchEndDate = dayjs(searchValue[1]).endOf('day');

    return recordDate >= searchStartDate && recordDate <= searchEndDate;
};



const numberCompare = (recordValue, searchValues) => {
    if (!recordValue) return;
    const value = Number(recordValue);
    if (!searchValues.length || isNaN(value)) return false;
    return value >= searchValues[0] && value <= searchValues[1];
};

const getDescendantValues = (record, dataIndex, objName) => {
    const values = [];

    (function recurse(record) {
        const val = !objName ? record[dataIndex] : record[objName][dataIndex];
        if (val) {
            values.push(val.toString().toLowerCase());
        }
        if (record.children) {
            record.children.forEach(recurse);
        }
    })(record);

    return values;
};

// const searchInput = useRef<InputRef>(null);
// {...getColumnSearchProps('dataIndex', searchInput, "", "type")}

export const getColumnSearchProps = (dataIndex, searchInput, objName, type) => {
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className='table-search' style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                {renderSearchComponent(setSelectedKeys, selectedKeys, confirm, clearFilters, searchInput, type)}
                <Row justify='end' style={{ marginTop: 8 }}>
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => {
                                confirm();
                            }}
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters();
                                confirm();
                            }}
                            size='small'
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? 'var(--color-primary)' : undefined }} />
        ),
        onFilter: (value, record) => {
            if (record.children) {
                switch (type) {
                    case 'DATE':
                        return getDescendantValues(record, dataIndex, objName).some((descValue) =>
                            dateCompare(descValue, value)
                        );
                    case 'NUMBER':
                        return getDescendantValues(record, dataIndex, objName).some((descValue) =>
                            numberCompare(descValue, value)
                        );
                    default:
                        const searchItem = value.split(',').map((e) => e.trim().toLowerCase());
                        return getDescendantValues(record, dataIndex, objName).some((descValue) =>
                            searchItem.some((val) => descValue.includes(val))
                        );
                }
            } else {
                const recordValue = objName ? record[objName][dataIndex] : record[dataIndex];
                switch (type) {
                    case 'DATE':
                        return dateCompare(recordValue, value);
                    case 'NUMBER':
                        return numberCompare(recordValue, value || [0, 0]);
                    default:
                        const search = value;
                        let result = false;
                        if (recordValue) {
                            search.split(',').map((e) => e.trim().toLowerCase()).forEach((itemSearch) => {
                                if (recordValue.toString().toLowerCase().includes(itemSearch)) {
                                    result = true;
                                    return;
                                }
                            });
                        }
                        return result;
                }

            }
        },
        // onFilterDropdownOpenChange: (visible) => {
        //     if (visible && searchInput) {
        //         setTimeout(() => searchInput.current.select(), 100);
        //     }
        // },
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible && searchInput && searchInput.current) {
                    setTimeout(() => searchInput.current.select(), 100);
                }
            },
        },
    };
};

const recursionIndex = (item) => {
    let result = [];
    if (item.length) {
        item.forEach((e) => {
            result.push(...recursionIndex(e));
        });
    } else if (item.children) {
        item.children.forEach((e) => {
            result.push(...recursionIndex(e));
        });
    } else {
        if (!item.hidden) {
            result.push({
                dataIndex: item.dataIndex,
                parentIndex: item.parentIndex,
                ignore: item.ignore,
                summary: item.summary,
            });
        }
    }
    //  result = result.filter(item => item.dataIndex !== 'name');
    return result;
};

export const tableSummary = (columns, record, ignore = 1) => {
    if (!record.length) return <></>;

    return (
        <Table.Summary fixed>
            <Table.Summary.Row style={{ background: 'transparent' }}>
                <Table.Summary.Cell key={0} index={0} className='ellipsis-text' colSpan={ignore}>
                    <b>Total</b>
                </Table.Summary.Cell>
                {recursionIndex(columns).map((col, index) => {
                    const idx = index + ignore;
                    if (col.ignore) {
                        return (
                            <Table.Summary.Cell
                                key={idx}
                                index={idx}
                                className={`summary-${col.dataIndex}`}
                                colSpan={1}
                            />
                        );
                    }
                    let result = 0;
                    switch (col.summary?.type) {
                        case 'Average':
                            result =
                                record.reduce((sum, item) => {
                                    const value = col.parentIndex
                                        ? Number(item[col.parentIndex][col.dataIndex])
                                        : Number(item[col.dataIndex]);
                                    if (isNaN(value)) return sum;
                                    return sum + value;
                                }, 0) / record.length;
                            break;
                        case 'Max':
                            result = record.reduce((max, item) => {
                                const value = col.parentIndex
                                    ? Number(item[col.parentIndex][col.dataIndex])
                                    : Number(item[col.dataIndex]);
                                if (isNaN(value)) return max;
                                return value > max ? value : max;
                            }, 0);
                            break;
                        case 'Min':
                            result = record.reduce((min, item) => {
                                const value = col.parentIndex
                                    ? Number(item[col.parentIndex][col.dataIndex])
                                    : Number(item[col.dataIndex]);
                                if (isNaN(value)) return min;
                                return value < min ? value : min;
                            }, 0);
                            break;
                        default:
                            result = record.reduce((sum, item) => {
                                const value = col.parentIndex
                                    ? Number(item[col.parentIndex][col.dataIndex])
                                    : Number(item[col.dataIndex]);
                                if (isNaN(value)) return sum;
                                return sum + value;
                            }, 0);
                            break;
                    }
                    return (
                        <Table.Summary.Cell
                            key={idx}
                            index={idx}
                            colSpan={1}
                            className={`ellipsis-text summary-${col.dataIndex}`}
                        >
                            {col.summary?.prefix}
                            {result
                                ? result % 1 === 0
                                    ? result.toLocaleString('en-us')
                                    : result.toLocaleString('en-us', { maximumFractionDigits: 2 })
                                : ''}
                            {col.summary?.suffix}
                        </Table.Summary.Cell>
                    );
                })}
            </Table.Summary.Row>
        </Table.Summary>
    );
};

//Hàm tách ra rồi tính tổng rồi ghép lại =))
export const calTotalFractionString = (data, property) => {
    const { numerator, denominator } = data.reduce((acc, item) => {
        const [num, denom] = item[property].split('/').map(Number);
        return {
            numerator: acc.numerator + num,
            denominator: acc.denominator + denom
        };
    }, { numerator: 0, denominator: 0 });

    return `${numerator}/${denominator}`;

}

//Hàm tính tổng rồi ghép lại =))
export const calTotalFractionTwoNums = (data, contPlan, contCompleted) => {
    const total = data.reduce((acc, item) => {
        acc.contPlan += item[contPlan];
        acc.contCompleted += item[contCompleted];
        return acc;
    }, { contPlan: 0, contCompleted: 0 });

    return `${total.contCompleted} / ${total.contPlan}`;
}

// Hàm xóa giá trị bằng 0
export const removeObjectsAndFields = (data, num) => {
    const processData = (item) => {
        item.listDataChild = item.listDataChild.filter(processData);

        const cont1Zero = item.cont1Plan === 0 && item.cont1Completed === 0;
        const cont2Zero = item.cont2Plan === 0 && item.cont2Completed === 0;
        const cont3Zero = item.cont3Plan === 0 && item.cont3Completed === 0;

        let isItemToDelete = false;

        if (num === 1) {
            isItemToDelete = cont2Zero && cont3Zero;
        } else if (num === 2) {
            isItemToDelete = cont1Zero && cont3Zero;
        } else if (num === 3) {
            isItemToDelete = cont1Zero && cont2Zero;
        } else {
            isItemToDelete = cont1Zero && cont2Zero && cont3Zero;
        }

        if (num === 1 || num === 2 || num === 3) {
            delete item[`cont${num}Plan`];
            delete item[`cont${num}Completed`];
        }
        return !isItemToDelete;
    };
    return data && data.filter(processData);
}

export const removeObjectsAndFieldsTotalTable = (data, nums = []) => {
    if (!Array.isArray(data)) return [];
    const processData = (item) => {
        // item.totalCont1Plan = (item.nhapCont1Plan || 0) + (item.xuatCont1Plan || 0);
        // item.totalCont1Completed = (item.nhapCont1Completed || 0) + (item.xuatCont1Completed || 0);
        // item.totalCont2Plan = (item.nhapCont2Plan || 0) + (item.xuatCont2Plan || 0);
        // item.totalCont2Completed = (item.nhapCont2Completed || 0) + (item.xuatCont2Completed || 0);
        // item.totalCont3Plan = (item.nhapCont3Plan || 0) + (item.xuatCont3Plan || 0);
        // item.totalCont3Completed = (item.nhapCont3Completed || 0) + (item.xuatCont3Completed || 0);

        // Cộng các trường totalCont cho các đối tượng trong listDataChild
        if (Array.isArray(item.listDataChild)) {
            item.listDataChild = item.listDataChild.filter((child) => {
                // child.totalCont1Plan = (child.nhapCont1Plan || 0) + (child.xuatCont1Plan || 0);
                // child.totalCont1Completed = (child.nhapCont1Completed || 0) + (child.xuatCont1Completed || 0);
                // child.totalCont2Plan = (child.nhapCont2Plan || 0) + (child.xuatCont2Plan || 0);
                // child.totalCont2Completed = (child.nhapCont2Completed || 0) + (child.xuatCont2Completed || 0);
                // child.totalCont3Plan = (child.nhapCont3Plan || 0) + (child.xuatCont3Plan || 0);
                // child.totalCont3Completed = (child.nhapCont3Completed || 0) + (child.xuatCont3Completed || 0);

                // Kiểm tra nếu cần xóa các trường Cont theo nums
                if (nums.includes(1)) {
                    delete child.nhapCont1Plan;
                    delete child.nhapCont1Completed;
                    delete child.xuatCont1Plan;
                    delete child.xuatCont1Completed;
                    delete child.totalCont1Plan;
                    delete child.totalCont1Completed;
                }
                if (nums.includes(2)) {
                    delete child.nhapCont2Plan;
                    delete child.nhapCont2Completed;
                    delete child.xuatCont2Plan;
                    delete child.xuatCont2Completed;
                    delete child.totalCont2Plan;
                    delete child.totalCont2Completed;
                }
                if (nums.includes(3)) {
                    delete child.nhapCont3Plan;
                    delete child.nhapCont3Completed;
                    delete child.xuatCont3Plan;
                    delete child.xuatCont3Completed;
                    delete child.totalCont3Plan;
                    delete child.totalCont3Completed;
                }

                // Kiểm tra nếu tất cả các trường Cont1, Cont2, và Cont3 của child đều bằng 0
                // const cont1Zero = child.nhapCont1Plan === 0 && child.nhapCont1Completed === 0 && child.xuatCont1Plan === 0 && child.xuatCont1Completed === 0;
                // const cont2Zero = child.nhapCont2Plan === 0 && child.nhapCont2Completed === 0 && child.xuatCont2Plan === 0 && child.xuatCont2Completed === 0;
                // const cont3Zero = child.nhapCont3Plan === 0 && child.nhapCont3Completed === 0 && child.xuatCont3Plan === 0 && child.xuatCont3Completed === 0;
                child.totalContPlan = (child.nhapCont1Plan || 0) + (child.xuatCont1Plan || 0) + (child.nhapCont2Plan || 0) + (child.xuatCont2Plan || 0) + (child.nhapCont3Plan || 0) + (child.xuatCont3Plan || 0);
                child.totalContCompleted = (child.nhapCont1Completed || 0) + (child.xuatCont1Completed || 0) + (child.nhapCont2Completed || 0) + (child.xuatCont2Completed || 0) + (child.nhapCont3Completed || 0) + (child.xuatCont3Completed || 0);
                return true;
            });
        }

        // Kiểm tra xem có cần xóa field nào không dựa trên nums
        if (nums.includes(1)) {
            // Nếu nums chứa 1, xóa các trường liên quan đến Cont1
            delete item.nhapCont1Plan;
            delete item.nhapCont1Completed;
            delete item.xuatCont1Plan;
            delete item.xuatCont1Completed;
            delete item.totalCont1Plan;
            delete item.totalCont1Completed;
        }
        if (nums.includes(2)) {
            // Nếu nums chứa 2, xóa các trường liên quan đến Cont2
            delete item.nhapCont2Plan;
            delete item.nhapCont2Completed;
            delete item.xuatCont2Plan;
            delete item.xuatCont2Completed;
            delete item.totalCont2Plan;
            delete item.totalCont2Completed;
        }
        if (nums.includes(3)) {
            // Nếu nums chứa 3, xóa các trường liên quan đến Cont3
            delete item.nhapCont3Plan;
            delete item.nhapCont3Completed;
            delete item.xuatCont3Plan;
            delete item.xuatCont3Completed;
            delete item.totalCont3Plan;
            delete item.totalCont3Completed;
        }

        // Kiểm tra nếu cả Cont1, Cont2, và Cont3 đều bằng 0 thì loại bỏ đối tượng này
        // const cont1Zero = item.nhapCont1Plan === 0 && item.nhapCont1Completed === 0 && item.xuatCont1Plan === 0 && item.xuatCont1Completed === 0;
        // const cont2Zero = item.nhapCont2Plan === 0 && item.nhapCont2Completed === 0 && item.xuatCont2Plan === 0 && item.xuatCont2Completed === 0;
        // const cont3Zero = item.nhapCont3Plan === 0 && item.nhapCont3Completed === 0 && item.xuatCont3Plan === 0 && item.xuatCont3Completed === 0;

        // Nếu tất cả các trường liên quan đến Cont2 đều bằng 0, xóa đối tượng
        // if (cont1Zero || cont2Zero || cont3Zero) {
        //     return false;  // Loại bỏ đối tượng nếu Cont2 có giá trị 0 hết
        // }

        item.totalContPlan = (item.nhapCont1Plan || 0) + (item.xuatCont1Plan || 0) + (item.nhapCont2Plan || 0) + (item.xuatCont2Plan || 0) + (item.nhapCont3Plan || 0) + (item.xuatCont3Plan || 0);
        item.totalContCompleted = (item.nhapCont1Completed || 0) + (item.xuatCont1Completed || 0) + (item.nhapCont2Completed || 0) + (item.xuatCont2Completed || 0) + (item.nhapCont3Completed || 0) + (item.xuatCont3Completed || 0);
        // Trả về true để giữ lại đối tượng nếu không bị xóa
        return true;
    };

    // Lọc qua tất cả các đối tượng trong data và áp dụng logic trên
    return data.filter(processData);
};

export const groupTopRecordsByContTotal = (data, expanded) => {
    if (expanded) return [...data].sort((a, b) => b.totalContPlan - a.totalContPlan);

    const sortedData = [...data].sort((a, b) => b.totalContPlan - a.totalContPlan);

    const topRecords = sortedData.slice(0, 5);
    const otherRecords = sortedData.slice(5);

    if (otherRecords.length === 0) return topRecords;

    // Tính toán tổng cho bản ghi "Khác"
    const otherSummary = otherRecords.reduce((acc, record) => {
        return {
            id: "OTHER",
            name: "Khác",
            nhapCont1Plan: acc.nhapCont1Plan + record.nhapCont1Plan || 0,
            nhapCont2Plan: acc.nhapCont2Plan + record.nhapCont2Plan || 0,
            nhapCont3Plan: acc.nhapCont3Plan + record.nhapCont3Plan || 0,
            xuatCont1Plan: acc.xuatCont1Plan + record.xuatCont1Plan || 0,
            xuatCont2Plan: acc.xuatCont2Plan + record.xuatCont2Plan || 0,
            xuatCont3Plan: acc.xuatCont3Plan + record.xuatCont3Plan || 0,
            nhapCont1Completed: acc.nhapCont1Completed + record.nhapCont1Completed || 0,
            nhapCont2Completed: acc.nhapCont2Completed + record.nhapCont2Completed || 0,
            nhapCont3Completed: acc.nhapCont3Completed + record.nhapCont3Completed || 0,
            xuatCont1Completed: acc.xuatCont1Completed + record.xuatCont1Completed || 0,
            xuatCont2Completed: acc.xuatCont2Completed + record.xuatCont2Completed || 0,
            xuatCont3Completed: acc.xuatCont3Completed + record.xuatCont3Completed || 0,
            totalContCompleted: acc.totalContCompleted + record.totalContCompleted || 0,
            totalContPlan: acc.totalContPlan + record.totalContPlan || 0,

            // totalCont1Completed: acc.totalCont1Completed + record.totalCont1Completed || 0,
            // totalCont2Completed: acc.totalCont2Completed + record.totalCont2Completed || 0,
            // totalCont3Completed: acc.totalCont3Completed + record.totalCont3Completed || 0,
            // totalCont1Plan: acc.totalCont1Plan + record.totalCont1Plan || 0,
            // totalCont2Plan: acc.totalCont2Plan + record.totalCont2Plan || 0,
            // totalCont3Plan: acc.totalCont3Plan + record.totalCont3Plan || 0,
            key: "other"
        };
    }, {
        id: "OTHER",
        name: "Khác",
        nhapCont1Plan: 0,
        nhapCont2Plan: 0,
        nhapCont3Plan: 0,
        xuatCont1Plan: 0,
        xuatCont2Plan: 0,
        xuatCont3Plan: 0,
        nhapCont1Completed: 0,
        nhapCont2Completed: 0,
        nhapCont3Completed: 0,
        xuatCont1Completed: 0,
        xuatCont2Completed: 0,
        xuatCont3Completed: 0,
        totalContCompleted: 0,
        totalContPlan: 0,

        // totalCont1Completed: 0,
        // totalCont2Completed: 0,
        // totalCont3Completed: 0,
        // totalCont1Plan: 0,
        // totalCont2Plan: 0,
        // totalCont3Plan: 0,
        key: "other"
    });
    // Loại bỏ các field có giá trị 0 nếu chúng không tồn tại trong tất cả các bản ghi
    Object.keys(otherSummary).forEach((key) => {
        const allZero = otherRecords.every(record => !(key in record));
        if (allZero) delete otherSummary[key];
    });
    return [...topRecords, otherSummary];
};

//Hàm hiển thị top 5 (còn lại thì tính thành record "Khác") cho bảng có tgian
export const groupTopRecordsByTime = (data, expanded) => {
    const sortedData = [...data].sort((a, b) => {
        // const [aA] = a.total.split('/').map(Number);
        // const [bA] = b.total.split('/').map(Number);
        // return bA - aA;
        const [, aB] = a.total.split('/').map(Number); // Lấy giá trị b từ a.total
        const [, bB] = b.total.split('/').map(Number); // Lấy giá trị b từ b.total
        return bB - aB; // Sắp xếp giảm dần theo b
    });

    if (expanded) return sortedData;

    const topRecords = sortedData.slice(0, 5);
    const otherRecords = sortedData.slice(5);

    if (otherRecords.length === 0) return topRecords;

    const otherSummary = otherRecords.reduce((acc, record) => {
        const [recordA, recordB] = record.total.split('/').map(Number);
        const [accA, accB] = acc.total.split('/').map(Number);

        const newA = accA + recordA;
        const newB = accB + recordB;

        return {
            id: "OTHER",
            name: "Khác",
            transportType: "XUẤT",
            six: acc.six + record.six,
            eight: acc.eight + record.eight,
            ten: acc.ten + record.ten,
            thirteen: acc.thirteen + record.thirteen,
            sixteen: acc.sixteen + record.sixteen,
            late: acc.late + record.late,
            total: `${newA}/${newB}`,  // Tính tổng dạng "a/b"
            key: "other"
        };
    }, {
        id: "OTHER",
        name: "Khác",
        transportType: "XUẤT",
        six: 0,
        eight: 0,
        ten: 0,
        thirteen: 0,
        sixteen: 0,
        late: 0,
        total: "0/0",  // Khởi tạo giá trị bắt đầu cho "total"
        key: "other"
    });

    return [...topRecords, otherSummary];
};

//Hàm hiển thị top 5 (còn lại thì tính thành record "Khác")
export const groupTopRecordsByCont = (data, expanded, transportType) => {
    if (expanded) return [...data].sort((a, b) => b.cont3Plan - a.cont3Plan);

    const topRecords = [...data].slice(0, 5).sort((a, b) => b.cont3Plan - a.cont3Plan);
    const otherRecords = [...data].slice(5).sort((a, b) => b.cont3Plan - a.cont3Plan);

    if (otherRecords.length === 0) return topRecords;

    // Tính toán tổng cho bản ghi "Khác"
    const otherSummary = otherRecords.reduce((acc, record) => {
        return {
            id: "OTHER",
            name: "Khác",
            transportType: transportType,
            cont1Plan: acc.cont1Plan + record.cont1Plan,
            cont2Plan: acc.cont2Plan + record.cont2Plan,
            cont3Plan: acc.cont3Plan + record.cont3Plan,
            cont1Completed: acc.cont1Completed + record.cont1Completed,
            cont2Completed: acc.cont2Completed + record.cont2Completed,
            cont3Completed: acc.cont3Completed + record.cont3Completed,
            key: "other"
        };
    }, {
        id: "OTHER",
        name: "Khác",
        transportType: transportType,
        cont1Plan: 0,
        cont2Plan: 0,
        cont3Plan: 0,
        cont1Completed: 0,
        cont2Completed: 0,
        cont3Completed: 0,
        key: "other"
    });

    return [...topRecords, otherSummary];
};
