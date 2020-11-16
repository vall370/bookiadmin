import React, { useEffect, useState } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Card,
  message,
  Radio,
  Form,
  Input,
  Tag,
} from 'antd';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import dayjs from 'dayjs';
import { blue } from '@ant-design/colors';
import Modal from 'antd/lib/modal/Modal';
import { Formik } from 'formik';
import { attemptRegisterCustomerUser } from '../../store/thunks/auth';
import 'antd/dist/antd.css';

import UserTable from '../shared/UserTable';
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};
const { Title } = Typography;

const initialValues = {
  apartment: '',
  building: '',
  password: '',
};

export default function CompanyUsers() {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [showUserCard, setShowUserCard] = useState(true);
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');
  const [password, setPassword] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([1]);
  const [company, setCompany] = useState(
    sessionStorage.getItem('company') || '',
  );
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const dispatch = useDispatch();
  function onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
    }
    setExpandedRowKeys(keys);
  }
  const onSubmit = async (values) => {
    setLoading1(true);
    values.company = company;
    axios
      .post('http://localhost:5556/api/adminfeatures/createUser', values)
      .then((response) => {
        setLoading1(false);
      });
    await sleep(1000);
    axios
      .get(
        `http://localhost:5556/api/adminfeatures/getApartmentCompany/${company}`,
      )
      .then((response) => {
        setAllData(response.data.result);
        console.log(allData);
      });
  };
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  function validateRequired(value) {
    return value ? undefined : 'required';
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(
        `http://localhost:5556/api/adminfeatures/getApartmentCompany/${company}`,
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
  function handleRowExpand(record) {
    // if a row is expanded, collapses it, otherwise expands it
    setExpandedRows((prevState) =>
      prevState.expandedRows.includes(record.key)
        ? {
            expandedRows: prevState.expandedRows.filter(
              (key) => key !== record.key,
            ),
          }
        : { expandedRows: [...prevState.expandedRows, record.key] },
    );
  }
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
      status: user.status,
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
  function UserGreeting(props) {
    return (
      <Row>
        {/* <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            if (!values.apartment) {
              return { apartment: 'Required' };
            }
            if (!values.building) {
              return { building: 'Required' };
            }
            if (!values.password) {
              return { password: 'Required' };
            }
            return {};
          }}
          render={() => (
            <Form layout={'inline'}>
              <FormItem
                name="apartment"
                label="Apartment"
                required={true}
                validate={validateRequired}
              >
                <Input name="apartment" placeholder="Apartment" />
              </FormItem>
              <FormItem
                name="building"
                label="Building"
                validate={validateRequired}
                required={true}
              >
                <Input name="building" placeholder="Building" />
              </FormItem>
              <FormItem
                name="password"
                label="Password"
                validate={validateRequired}
                required={true}
              >
                <Input name="password" placeholder="Password" />
              </FormItem>
              <Row>
                <Col span={8}>
                  <Button.Group>
                    <Button onClick={DisableUserForm} type="ghost">
                      Cancel
                    </Button>

                    <ResetButton>Reset</ResetButton>
                    <SubmitButton loading={loading1}>Submit</SubmitButton>
                  </Button.Group>
                </Col>
              </Row>
            </Form>
          )}
        /> */}
      </Row>
    );
  }

  function DisableUserForm() {
    setShowUserCard(false);
  }
  function GuestGreeting(props) {
    return null;
  }
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
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
    console.log(filteredInfo);
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
      width: 20,
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
  ];
  const showAdduserScene = () => {
    setShowUserCard(true);
    console.log(showUserCard);
  };
  /*   const handleOk = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      setShowUserCard(false);
    }, 3000);
  };
  const handleCancel = () => {
    setLoading1(false);
  }; */

  function IsAddingUser() {
    if (showUserCard) {
      return <p>{showUserCard}</p>;
    } else {
      return <p>{showUserCard}</p>;
    }
    /*     if (showUserCard) {
      return (
        
      );
    } else {
      return null;
    } */
  }
  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
          <Button onClick={showAdduserScene} type="primary">
            Add User
          </Button>
        </Space>

        <Title>
          <Greeting isLoggedIn={showUserCard} />
        </Title>
      </Card>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={true}
        loading={loading}
        onChange={handleChange}
        onExpand={onTableRowExpand}
        /*         onExpand={(expanded, record) => {
          console.log(record.key);
        }} */
        /*
        // tell the 'Table' component which rows are expanded
        expandedRowKeys={expandedRows} */
        expandedRowKeys={expandedRowKeys}
        expandable={{
          expandedRowRender: (record) => <UserTable record={record} />,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        size="default"
        className="components-table-demo-control-bar"
      />
    </div>
  );
}
