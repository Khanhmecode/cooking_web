import { Button, ConfigProvider, Form, Input, Upload } from 'antd';
import type { FormProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import createPost from '@/functions/createNewPost';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish: FormProps['onFinish'] = async (values) => {
  console.log(values);
  const result = await createPost(values);
  location.reload();
};


const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const handleChange = (e: any) => {
  console.log('change:',e);
}

const FormCreatePost: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "black",
        fontSize: 17,
        colorText: "black"
      },
    }}
  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Upload" 
        name="thumbnail"
        valuePropName="thumbnail" 
        getValueFromEvent={normFile}
        >
        <Upload 
          action="api/upload" 
          listType="picture-card"
          onChange={handleChange}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </ConfigProvider>
);

const createNewPost = () => {
  return (
    <>
      <div className="flex flex-row mx-auto w-full py-10 bg-white rounded-lg shadow-lg mt-14 gap-8">
        <div className="w-1/2">
          <FormCreatePost/>
        </div>
        <img src="/images/home.png" alt="" className='w-1/2 float-right' />
      </div>
    </>
  )
}

export default createNewPost;