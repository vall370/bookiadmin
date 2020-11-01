import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Typography } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';

const { Title } = Typography;


export default function Users() {
    const history = useHistory();
    const [allData, setAllData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const result = await axios(
                'http://localhost:5555/api/adminfeatures/getApartmentCompany/Diös Fastigheter',
            );

            setAllData(result.data.result);
            setLoading(false)
        };

        fetchData();
    }, []);
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Apartment',
            dataIndex: 'apartment',
            key: 'apartment',
            sorter: (a, b) => a.apartment.localeCompare(b.apartment)
        },
        {
            title: 'Building',
            dataIndex: 'building',
            key: 'building',

            sorter: (a, b) => a.building.localeCompare(b.building)
        },
        {
            title: 'Created At',
            dataIndex: 'created_date',
            key: 'created_date',

            sorter: (a, b) => a.created_date.length - b.created_date.length,
        },
    ];

    const data = [];

    allData.map((user) => {
        data.push({
            key: user.id,
            id: user.id,
            apartment: user.apartment,
            building: user.building,
            created_date: user.created_date,
        })
        return data;
    });

    const handleClick = () => {
        history.push('/form')
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys })
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys })
                },
            },
        ],
    };

    return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} loading={loading} size="small" />
        </div>
    );
}