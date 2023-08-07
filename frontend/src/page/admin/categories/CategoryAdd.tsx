import React from 'react'
import { Breadcrumb, Typography } from "antd";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { useAddCategoryMutation } from '../../../api/categories';

const { Title, Text } = Typography;

type Props = {}

const schema = yup.object({
  name: yup
    .string()
    .required("* Required to enter category name")
    .min(6, "* At least 6 characters")
    .trim(),
});

const CategoryAdd = (props: Props) => {
  const [addCategory] = useAddCategoryMutation()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors } ,
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log("data", data);
      
      await addCategory({ ...data }).unwrap().then(() => {
          toast.success(
            "Category created successfully, redirect after 3 seconds"
          );
          reset();
          setTimeout(() => navigate("/admin/category"), 3000);
        })
        .catch(() => {
          swal("This category already exists.", {
            icon: "error",
          });
        });
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  // const errors: FieldErrors<any>
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
          <Text type="danger">{errors.name?.message}</Text>
        </Form.Group>
        <Button style={{ marginTop: 20 }} variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </div>
  </section>
  )
}

export default CategoryAdd