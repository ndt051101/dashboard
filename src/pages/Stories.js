import {
  Row,
  Col,
  Card,
  Table,
  message,
  Button,
  Tag,
  Popconfirm,
  Image,
} from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

function Stories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const getStories = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stories-review?page=1"
      );
      console.log({ response });
      if (response.data.statusCode === 200) {
        setStories(response.data.data);
      }
    };
    getStories();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/stories-review/${id}`
      );
      if (response.data.statusCode === 201) {
        message.success("Accept story successfully");
      }
      await new Promise((_) => setTimeout(_, 1000));
      window.location.reload();
    } catch (e) {
      console.log(e);
      message.error("Accept story failed");
    }
  };

  const confirmDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/stories/${id}`
      );
      message.success("Delete story successfully");
      await new Promise((_) => setTimeout(_, 1000));
      window.location.reload();
    } catch (e) {
      console.log(e);
      message.error("Delete story failed");
    }
  };

  const columns = [
    {
      title: "NO",
      dataIndex: "id",
      key: "id",
      //   width: "32%",
    },
    {
      title: "IMAGE",
      key: "avatar",
      align: "center",
      dataIndex: "avatar",
      render: (_, record) => {
        if (record.media) {
          return <Image width={100} src={record.media} />;
        } else if (record.text_json) {
          if (record.text_json.bg) {
            return <Image width={100} src={record.text_json.bg} />;
          } else {
            return <div>No image</div>;
          }
        } else {
            return <div>No image</div>;
        }
      },
    },
    {
      title: "Author",
      dataIndex: "created_by",
      key: "created_by",
      render: (_) => {
        return <a href={`http://localhost:3000/${_.user_name}`}>{_.name}</a>;
      },
    },
    {
      title: "Content",
      dataIndex: "created_by",
      key: "created_by",
      render: (_, record) => {
        return <span>{record.text_json.text}</span>
      },
    },
    {
      title: "STATUS",
      key: "status",
      align: "center",
      dataIndex: "status",
      render: (_, record) => {
        let color = record.status === 0 ? "volcano" : "green";
        return (
          <Tag color={color} key={record.id}>
            {record.status === 0 ? (
              <span>Waiting</span>
            ) : (
              <span>Completed</span>
            )}
          </Tag>
        );
      },
    },
    {
      title: "BROWSE",
      key: "employed",
      align: "center",
      dataIndex: "employed",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={() => handleAccept(record.id)}>
              <CheckOutlined />
            </Button>
            <Popconfirm
              title="Are you sure to delete this story?"
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
              title="Manage stories"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={stories}
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
}

export default Stories;
