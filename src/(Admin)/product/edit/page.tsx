import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom";

// định nghĩa các trường
type FieldType = {
  name?: string;
  price?: string;
  description?: string;
};

const EditProductPage = () => {
  const { id } = useParams();
  console.log(id);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return await instance.get(`/products/${id}`);
    },
  });

  console.log(data?.data);

  const { mutate } = useMutation({
    mutationFn: async (newProduct: FieldType) => {
      try {
        return await instance.put(`products/${id}`, newProduct);
      } catch (error) {
        throw new Error("TCập nhật thất bại !");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công !",
      });
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: ['products', id]
      })
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  return (
    <div>
      <>
        {contextHolder}
        <div className="flex items-center justify-between mb-4">
          <h1>Thêm Sản Phẩm</h1>
          <Button>
            <Link to={`/admin/products`}>
              <BackwardFilled />
              Quay Lại
            </Link>
          </Button>
        </div>
      </>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={data?.data}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Tên sản phẩm không được trống !" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá"
          name="price"
          rules={[
            { required: true, message: "Giá sản phẩm không được trống !" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProductPage;
