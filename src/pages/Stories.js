import {
    Row,
    Col,
    Card,
    Table,
    message,
    Button,
    Tag
} from "antd";
import { CheckOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import axios from "axios";

function Stories() {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        const getStories = async () => {
            const response = await axios.get('http://localhost:5000/api/admin/stories-review?page=1');
            console.log({response})
            if(response.data.statusCode === 200) {
                setStories(response.data.data)
            }
        }
        getStories();
    }, []);

    const handleAccept = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/stories-review/${id}`);
            if(response.data.statusCode === 201) {
                message.success('Accept story successfully')
            }
            await new Promise((_) => setTimeout(_, 1000));
            window.location.reload();
        }catch (e) {
            console.log(e);
            message.error('Accept story failed');
        }
    }

    const columns = [
        {
            title: "NO",
            dataIndex: "id",
            key: "id",
            width: "32%",
        },
        {
            title: "Name",
            dataIndex: "created_by",
            key: "created_by",
            render: (_) => {
                return (
                    <span>
                        {_.name}
                    </span>
                )
            }
        },
        {
            title: "STATUS",
            key: "status",
            align: "center",
            dataIndex: "status",
            render: (_, record) => {
                console.log(record)
                let color = record.status === 0 ? 'volcano' : 'green';
                return (
                    <Tag color={color} key={record.id}>
                        {record.status === 0 ? <span>Waiting</span> : <span>Completed</span>}
                    </Tag>
                )
            }
        },
        {
            title: "BROWSE",
            key: "employed",
            align: "center",
            dataIndex: "employed",
            render: (_, record) => {
                return (
                    <Button onClick={() => handleAccept(record.id)}>
                        <CheckOutlined />
                    </Button>
                )
            }
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
