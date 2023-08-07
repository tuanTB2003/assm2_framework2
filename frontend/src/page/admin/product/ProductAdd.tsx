import React, { useState } from "react";
import { Breadcrumb, Typography, Image } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "../../../api/product";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../api/categories";

type FormType = {
  _id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  description: string;
  images: any;
  category: string;
};

const { Title, Text } = Typography;
const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Required to enter product name")
    .min(6, "* At least 6 characters")
    .trim(),
  price: yup
    .string()
    .required("* Required to enter product price")
    .test("min", "Please re-enter the price", (price) => Number(price) > 0),
  discount: yup
    .string()
    .required("* Required to enter product price")
    .test(
      "min",
      "Please re-enter the price",
      (discount) => Number(discount) > 0
    ),
  quantity: yup
    .string()
    .required("* Required to enter product price")
    .test(
      "min",
      "Please re-enter the price",
      (quantity) => Number(quantity) > 0
    ),
  description: yup
    .string()
    .required("* Required to enter product description")
    .min(6, "* At least 6 characters")
    .max(255, "* Up to 255 characters")
    .trim(),
  category: yup.string().required("* Please select a product category"),
});

const ProductAdd = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [uploadImage] = useUploadImageMutation();
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState<string>();
  const handlePreviewImage = (e: any) => {
    console.log("previewImage", previewImage);

    setPreviewImage(URL.createObjectURL(e.target));
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log("data", data);
      // const url =  await uploadImage(data.images)
      
      const newData = {
        ...data,
        images: [`https://picsum.photos/226/200`],
      };
      console.log("newData", newData);

     
      await addProduct(newData);
      toast.success("Product created successfully, redirect after 2 seconds");
      setPreviewImage("");
      reset();
      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (error: any) {
      toast.error("Error! Please try again later.");
    }
  };

  return (
    <section >
      {isLoading ? <div>...Loading</div> : ""}
     
      <div
       
        style={{
          maxWidth: "70%",
          margin: "auto",
          padding: 40,
        }}
      >
        <Title level={2}>Add product</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Product's name</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Please enter the name of the product"
              autoComplete="off"
              {...register("name")}
            />
            <Text type="danger">{errors.name?.message}</Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              // placeholder="Please enter the price of the product"
              autoComplete="off"
              {...register("price")}
            />
            <Text type="danger">{errors.price?.message}</Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select {...register("category")}>
              <option value="">Select a category</option>
              {categories?.data?.map((item: any, index: any) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            <Text type="danger">{errors.category?.message}</Text>
          </Form.Group>
          <Form.Group className="mb-3 my-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              // placeholder="Please enter the quantity of the product"
              autoComplete="off"
              {...register("quantity")}
            />
            <Text type="danger">{errors.price?.message}</Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              // placeholder="Please enter the price of the product"
              autoComplete="off"
              {...register("discount")}
            />
            <Text type="danger">{errors.price?.message}</Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              // placeholder="Please enter product description"
              autoComplete="off"
              style={{ height: "100px" }}
              {...register("description")}
            />
            <Text type="danger">{errors.description?.message}</Text>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="url"
              {...register("images")}
              onChange={(e) => handlePreviewImage(e)}
            />
            {/* <Text type="danger">{errors.image?.message}</Text> */}
          </Form.Group>
         
          <Button style={{ marginTop: 20 }} variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ProductAdd;
