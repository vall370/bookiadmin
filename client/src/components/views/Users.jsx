import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Typography, Space, Card } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
const { Title } = Typography;

export default function Users() {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        'http://localhost:5556/api/adminfeatures/getApartmentCompany/Diös Fastigheter',
      );

      setAllData(result.data.result);
      setLoading(false);
    };

    fetchData();
  }, []);
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const data = [];

  allData.map((user) => {
    let created_date = dayjs(user.created_date).format(
      'h:mm dddd, MMMM D, YYYY',
    );
    data.push({
      key: user.id,
      id: user.id,
      apartment: user.apartment,
      building: user.building,
      created_date: created_date,
    });
    return data;
  });

  const handleClick = () => {
    history.push('/form');
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
        },
      },
    ],
  };
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  const handleChange = (pagination, filters, sorter) => {
    console.log('asd');
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    console.log('asd');

    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    console.log(filteredInfo)
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'created_date',
    });
  };
  let data1 = [];
  data.forEach((element) => {
    data1.push({ text: element.building, value: element.building });
  });
  data1 = data1.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj.value).indexOf(obj.value) == pos;
  });
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Apartment',
      dataIndex: 'apartment',
      key: 'apartment',
      fixed: 'left',
      width: 100,
      sorter: (a, b) => a.apartment.localeCompare(b.apartment),
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: 'building',
      fixed: 'left',
      width: 100,
      filters: data1,
      filterMultiple: false,
      filteredValue: filteredInfo.building || null,
      onFilter: (value, record) => record.building.indexOf(value) === 0,
      sorter: (a, b) => a.building.localeCompare(b.building),
    },
    /*     {
      title: 'Created At',
      dataIndex: 'created_date',
      key: 'created_date',
      sorter: (a, b) => a.created_date - b.created_date,
      sortOrder: sortedInfo.columnKey === 'created_date' && sortedInfo.order,
      ellipsis: true,
    }, */
  ];
  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
      </Card>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleChange}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.apartment}</p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        size="small"
        className="your-table"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  );
}
