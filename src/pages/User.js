import { Row, Col, Card, Table, message, Button, Tag, Image, Popconfirm } from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users?page=1"
      );
      if (response.data.statusCode === 200) {
        const dataUsers = response.data.data.data
          .reverse()
          .map((user, index) => {
            return {
              ...user,
              no: index + 1,
            };
          });
        setUsers(dataUsers);
      }
    };
    getUsers();
  }, []);

  const confirmDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        message.success('Delete user successfully')
        await new Promise((_) => setTimeout(_, 1000));
        window.location.reload();
    }catch (e) {
        console.log(e);
        message.error('Delete user failed');
    }
    console.log("Log ", id)
  };

  console.log(users);
  const columns = [
    {
      title: "NO",
      dataIndex: "no",
      key: "no",
      align: "center",
    },
    {
      title: "IMAGE",
      key: "avatar",
      align: "center",
      dataIndex: "avatar",
      render: (_, record) => {
        return <Image width={100} src={record.avatar} />;
      },
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "USER NAME",
      key: "user_name",
      align: "center",
      dataIndex: "user_name",
    },

    {
      title: "ACTION",
      key: "employed",
      align: "center",
      dataIndex: "employed",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              onClick={() => {
                window.location.href = `http://localhost:3000/${record.user_name}`;
              }}
            >
              <InfoCircleOutlined />
            </Button>
            <Popconfirm
              title="Are you sure to delete this account?"
              onConfirm={(e) => confirmDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Manage Users"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Users;
