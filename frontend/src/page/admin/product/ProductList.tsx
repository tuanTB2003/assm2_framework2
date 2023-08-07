import React from 'react'
import { Table, Space, Typography, Button, Breadcrumb, Image, Pagination  } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';


const { Text, Title } = Typography;

type Props = {}

const ProductList = (props: Props) => {
    const { data  , isLoading } = useGetProductsQuery();
    const [removeProduct , {isSuccess}] = useRemoveProductMutation()
    // console.log("dataRe" ,dataRe);
    
    const removeConfirm = async (product : any) => {
      const confirm = window.confirm('Are you sure you want to remove ?')
      if(confirm){
        // console.log("delete" , product?._id);
        removeProduct(product?._id)        
      }
    }
    
    const columns = [
        {
          title: "ID",
          dataIndex: "key",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: "quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Image",
          dataIndex: "images",
          key: "images",
         
          render: (images: string) => (
            <a>
              <img  src={images} alt="" width={100} />
            </a>
          ),
        },
        {
          title: "Price (USD)",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
        },
        {
          title: "quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Action",
          key: "action",
          render: (record: any) => (
            <Space size="middle">
              <NavLink to={"/admin/products/edit/" + record?.slug}>
                <EditOutlined />
              </NavLink>
              <Text type="danger" onClick={() => removeConfirm(record)}>
                <DeleteOutlined />
              </Text>
            </Space>
          ),
        },
      ];
      const dataProducts = data?.data?.map((item :any, index :any) => {
        return {
          ...item,
          category: item.category.name,
          images: item.images[0],
          key: index + 1,

          // _id: item._id,
          // name: item.name,
          // price: item.price,
          // category: item.category.name,
          // description: item.description,
          // image: item.image,
        };
      });     
 
  return (
    <div>
         <section >
    
      <div  style={{ padding: 40 }}>
        <Title level={2}>PRODUCTS LIST</Title>
        <Button type="primary" style={{ marginBottom: 16 }} ghost>
          <NavLink to={"add"}>Add Product</NavLink>
        </Button>
        {isLoading ? <div>...IsLoading</div> :  <Table dataSource={dataProducts} columns={columns}  pagination={{ pageSize: 3 }}/>  }
        {/* <Table dataSource={data} columns={columns} /> */}
      </div>
    </section>
    </div>
  )
}

export default ProductList