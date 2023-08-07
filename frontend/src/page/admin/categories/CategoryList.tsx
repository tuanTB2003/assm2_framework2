import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { useGetCategoriesQuery, useRemoveCategoryMutation } from "../../../api/categories";

const { Text, Title } = Typography;

type Props = {};

const CategoryList = (props: Props) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  // const [] = use
  const [removeCategory , {isSuccess}] = useRemoveCategoryMutation()

  const remoceConfirm = async (category: any) => {
    const confirm = window.confirm("Are you sure you want to...?");
    if (confirm) {
      console.log("xóa", categories);
      console.log();
      // (product?._id)        
      removeCategory(category?._id)
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <NavLink to={"/admin/category/edit/" + record?._id}>
            <EditOutlined />
          </NavLink>
          {record._id !== "64ca34ed3dd995caf0f8d3cb" ? (
            <Text type="danger" onClick={() => remoceConfirm(record)}>
              <DeleteOutlined />
            </Text>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];
  const data = categories?.data?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item._id,
      name: item.name,
    };
  });

  return (
    <section >
      {/* <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Categories</Breadcrumb.Item>
      </Breadcrumb> */}
      <div className="home-content" style={{ padding: 40 }}>
        <Title level={2}>CATEGORY LIST</Title>
        <Button type="primary" style={{ marginBottom: 16 }} ghost>
          <NavLink to={"add"}>Add Category</NavLink>
        </Button>
        {isLoading ? (
          <div>...IsLoading</div>
        ) : (
          <Table dataSource={data} columns={columns} />
        )}
      </div>
    </section>
  );
};

export default CategoryList;
