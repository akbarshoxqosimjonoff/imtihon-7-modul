import React, { useState, useEffect } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Modal, message, Form, Input } from "antd";
import { Image } from "antd";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name?: string;
  descrip?: string;
  website?: string;
  image?: string;
}

const Adds: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setFilteredData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(lowercasedSearchText) ||
          item.descrip?.toLowerCase().includes(lowercasedSearchText)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data]);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setYearSort = () => {
    setSortedInfo({
      order: "descend",
    });
  };

  const handleEdit = (key: string) => {
    const record = data.find((item) => item.key === key);
    if (record) {
      form.setFieldsValue(record);
      setEditingKey(key);
      setIsEditing(true);
      setIsFormVisible(true);
    }
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you really want to delete this record?",
      onOk() {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        setFilteredData(newData);
        localStorage.setItem("data", JSON.stringify(newData));
        message.success("Record deleted");
      },
    });
  };

  const showAddForm = () => {
    setIsEditing(false);
    form.resetFields();
    setIsFormVisible(true);
  };

  const handleSave = (values: any) => {
    if (isEditing && editingKey) {
      const updatedData = data.map((item) =>
        item.key === editingKey ? { ...item, ...values } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
      setIsEditing(false);
      setEditingKey(null);
    } else {
      const newData: DataType = {
        key: (data.length + 1).toString(),
        ...values,
      };
      const updatedData = [...data, newData];
      setData(updatedData);
      setFilteredData(updatedData);
      localStorage.setItem("data", JSON.stringify(updatedData));
    }
    setIsFormVisible(false);
    form.resetFields();
    message.success("Record saved");
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={100} />,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "O", value: "O" },
        { text: "M", value: "M" },
        { text: "N", value: "N" },
        { text: "T", value: "T" },
        { text: "G", value: "G" },
        { text: "K", value: "K" },
        { text: "J", value: "J" },
        { text: "B", value: "B" },
        { text: "E", value: "E" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) =>
        record.name?.includes(value as string) ?? false,
      sorter: (a, b) => (a.name || "").length - (b.name || "").length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Description",
      dataIndex: "descrip",
      key: "descrip",
      filters: [],
      filteredValue: filteredInfo.description || null,
      onFilter: (value, record) =>
        record.descrip?.includes(value as string) ?? false,
      sorter: (a, b) => (a.descrip || "").length - (b.descrip || "").length,
      sortOrder: sortedInfo.columnKey === "descrip" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleEdit(record.key)}
            style={{ background: "red", color: "white" }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.key)} type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const pagination = data.length > 4 ? { pageSize: 4 } : false;

  return (
    <>
      <Space
        style={{ marginBottom: 16, display: "flex", alignItems: "center" }}
      >
        <Input
          placeholder="Search by Title or desc"
          value={searchText}
          onChange={handleSearch}
          style={{ marginRight: 16 }}
        />
        <Button
          style={{
            background: "green",
            color: "white",
            border: "2px solid white",
          }}
          onClick={showAddForm}
        >
          Add
        </Button>
      </Space>
      <h1 style={{ color: "black" }}>Jobs</h1>

      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={handleChange}
        pagination={pagination}
      />
      <Modal
        title={isEditing ? "Edit Record" : "Add New Record"}
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="image"
            label="Car Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Title"
            rules={[{ required: true, message: "Please input the car name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descrip"
            label="Description"
            rules={[
              { required: true, message: "Please input the description" },
            ]}
          >
            <Input type="string" />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Adds;
