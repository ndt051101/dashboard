import { Row, Col, Card, Table, message, Button, Tag, Popconfirm, Image } from "antd";

import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/admin/posts-review?page=1"
      );
      if (response.data.statusCode === 200) {
        setPosts(response.data.data.data.reverse());
      }
    };
    getPosts();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/posts-review/${id}`
      );
      if (response.data.statusCode === 201) {
        message.success("Accept post successfully");
      }
      await new Promise((_) => setTimeout(_, 1000));
      window.location.reload();
    } catch (e) {
      console.log(e);
      message.error("Accept post failed");
    }
  };

  const confirmDelete = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/admin/posts/${id}`);
        message.success('Delete post successfully')
        await new Promise((_) => setTimeout(_, 1000));
        window.location.reload();
    }catch (e) {
        console.log(e);
        message.error('Delete post failed');
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
        key: "media",
        align: "center",
        dataIndex: "media",
        render: (_, record) => {
         const firstImage = record.media.find(media => {
            return media.type === 1
         })
          if (firstImage) {
            return <Image width={100} src={firstImage.name} />;
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
      title: "CAPTION",
      dataIndex: "caption",
      key: "caption",
    },
    {
      title: "STATUS",
      key: "status",
      align: "center",
      dataIndex: "status",
      render: (_, record) => {
        console.log(record);
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
      title: "ACTION",
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
              title="Are you sure to delete this post?"
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
              title="Manage Posts"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={posts}
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

export default Posts;
