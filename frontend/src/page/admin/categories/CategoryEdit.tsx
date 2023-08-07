import React, { useEffect, useState } from "react";

import { Breadcrumb, Typography } from "antd";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../../api/categories";


type FormType = {
  _id: string;
  name: string;
};

const { Title, Text } = Typography;
const schema = yup.object({
  name: yup
    .string()
    .required("* Required to enter category name")
    .min(4, "* At least 6 characters")
    .trim(),
});
const CategoryEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  // Get category by ID
  const { data , isLoading } = useGetCategoryByIdQuery(id ||'');
  const [updateCategory] = useUpdateCategoryMutation();
  // setCategories(data.data.name)
  // console.log('data',data.data);

  // console.log("id" , id);
  useEffect(() => {
      reset(data.data)
      // console.log(data);
      
  }, []);
  
  
  

  // Submit form
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const categoryUpdate = {
        _id: data._id,
        data: {
          name: data.name
        }
      }      
      await updateCategory(categoryUpdate);
      toast.success("Category updated successfully");
      reset();
      navigate("/admin/category");
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <section >
  
      <div
        style={{
          maxWidth: "70%",
          margin: "auto",
          padding: 40,
        }}
      >
        <Title level={2}>ADD CATEGORY</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Please enter the name of the category"
              id="name"
              autoComplete="off"
              {...register("name")}

            />
            <Text type="danger">{errors?.name?.message}</Text>
          </Form.Group>
          <Button style={{ marginTop: 20 }} variant="primary" type="submit">
            {/* Add Category */}
            {isLoading ? 'Loading...' : 'Update Category'}
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default CategoryEdit;
