import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Breadcrumb, Typography, Image } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../api/categories";
import {
  useGetProductBySlugQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../../api/product";

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

const ProductUpdate = () => {
  const { id } = useParams();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data } = useGetProductBySlugQuery(id || "");
  const [uploadImage] = useUploadImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(data.data);
  }, []);

  const [previewImage, setPreviewImage] = useState<string>();

  const handlePreviewImage = (e: any) => {
    console.log("previewImage", previewImage);
    setPreviewImage(URL.createObjectURL(e.target));
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {

      const updateData = {
        _id : data._id,
        data: {
          name: data.name,
          category: data.category,
          description: data.description,
        // className="home-content",
          images: [`https://picsum.photos/226/200`],
          price: data.price,
          discount: data.discount,
          quantity: data.quantity
        }
      };
      // console.log("newData", newData);

      await updateProduct(updateData);
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
        <Title level={2}>PRODUCTS ADD</Title>
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
              <option value={data?.data?.category}>Select a category</option>
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
          {/* <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Preview Image
            </label>
            <div className="mt-1">
              <Image
                src={
                  previewImage ||
                  "https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                }
                alt="Preview Image"
                className="h-8 w-full object-cover rounded-md"
                style={{ height: "300px" }}
              />
            </div>
          </div> */}
          <Button style={{ marginTop: 20 }} variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ProductUpdate;
