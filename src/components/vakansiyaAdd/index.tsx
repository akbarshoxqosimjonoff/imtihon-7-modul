import React, { useState } from "react";
import { Table, Button, Form, Input, Modal, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";

const initialData: DataType[] = [];

interface DataType {
  key: React.Key;
  name: string;
  desc: number;
  technologies: string;
  location: string;
  salary: string;
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [filteredData, setFilteredData] = useState<DataType[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState<string>("");

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataType) => {
    setIsEditing(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key: React.Key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleSave = (values: any) => {
    if (isEditing && currentRecord) {
      const updatedData = data.map((item) =>
        item.key === currentRecord.key
          ? {
              ...item,
              ...values,
              description: `My name is ${values.name}, I am ${values.age} years old, living at ${values.address}.`,
            }
          : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
    } else {
      const newEntry: DataType = {
        key: data.length + 1,
        name: values.name,
        desc: values.desc,
        location: values.location,
        technologies: values.technologies,
        salary: values.salary,
        phone: values.phone,
        email: values.email,
        telegram: values.telegram,
        instagram: values.instagram,
      };
      const newData = [...data, newEntry];
      setData(newData);
      setFilteredData(newData);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.location.toLowerCase().includes(value.toLowerCase()) ||
        item.technologies.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.toLowerCase().includes(value.toLowerCase()) ||
        item.telegram.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.instagram.toLowerCase().includes(value.toLowerCase()) ||
        item.location.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "desc", key: "desc" },
    { title: "Technologies", dataIndex: "technologies", key: "technologies" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Salary", dataIndex: "salary", key: "salary" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Telegram", dataIndex: "telegram", key: "telegram" },
    { title: "Instagram", dataIndex: "instagram", key: "instagram" },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            style={{ background: "green", color: "white" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this entry?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" style={{ background: "red", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", margin: "10px" }}
      />
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: "20px" }}
      >
        Add
      </Button>
      <h1 style={{ color: "black" }}>Jobs</h1>
      <Table
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.desc}</p>
          ),
        }}
        dataSource={filteredData}
      />
      <Modal
        title={isEditing ? "Edit Entry" : "Add New Entry"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input type="string" />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[
              {
                required: true,
                message: "Please input your car technologies!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: "Please input your car location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Please input your Salary!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            name="telegram"
            label="Telegram"
            rules={[{ required: true, message: "Please input your telegram!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instagram"
            label="Instagram"
            rules={[
              { required: true, message: "Please input your instagram!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
