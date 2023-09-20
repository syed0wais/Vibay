import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";


// Custom validation rule function
const validateEmailDomain = (rule, value) => {
  if (!value) {
    return Promise.reject('Please enter your email address');
  }

  // Define the allowed email domain(s)
  const allowedDomain = 'vitstudent.ac.in'; //  desired domain

  // Extract the domain from the email
  const emailParts = value.split('@');
  const domain = emailParts[emailParts.length - 1];

  // Check if the domain matches the allowed domain
  if (domain.toLowerCase() !== allowedDomain.toLowerCase()) {
    return Promise.reject('Only emails from "' + allowedDomain + '" are allowed.');
  }

  return Promise.resolve();
};


const rules = [
  {
    required: true,
    message: "required",
  },
];



const emailRules = [
  {
    type: 'email',
    message: 'Please enter a valid email address',
  },
  {
    validator: validateEmailDomain,
  },
];


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
      <h1 className="text-primary text-3xl">
          Vi<span className="text-gray-400 text-3xl">Bay</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input placeholder="VIT Student Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
