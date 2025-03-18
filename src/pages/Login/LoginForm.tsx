import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loginRequest, signUpRequest } from "../../redux/auth/authSlice";
import "../../styles/LoginForm.css";

const LoginForm: React.FC = () => {
  const { isAuthenticated, error, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState<"Login" | "Sign up">(
    "Login"
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser && currentState === "Sign up") {
      form.setFieldsValue({
        userName: currentUser.userName,
        password: currentUser.password,
      });
      setCurrentState("Login");
    }
  }, [currentState, currentUser, form]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = (values: {
    userName: string;
    password: string;
    email?: string;
  }) => {
    if (currentState === "Sign up") {
      const newUser = {
        userName: values.userName,
        password: values.password,
        email: values.email || "",
        status: "Hey there, I am using the chat app",
      };

      dispatch(signUpRequest(newUser));
    } else {
      dispatch(
        loginRequest({ userName: values.userName, password: values.password })
      );
    }
  };

  const toggleForm = () => {
    form.resetFields();
    setCurrentState(currentState === "Login" ? "Sign up" : "Login");
  };

  return (
    <div className="login">
      <Form form={form} className="login-form" onFinish={onFinish}>
        <h2>{currentState}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Enter username" }]}
        >
          <Input className="form-input" placeholder="Username" />
        </Form.Item>
        {currentState === "Sign up" && (
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Enter your email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input className="form-input" placeholder="Email" />
          </Form.Item>
        )}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password className="form-input" placeholder="Password" />
        </Form.Item>
        <Button className="btn" type="primary" htmlType="submit">
          {currentState}
        </Button>
        <p className="login-toggle">
          {currentState === "Login" ? "New user?" : "Already have an account?"}{" "}
          <span onClick={toggleForm}>
            {currentState === "Login" ? "Sign up" : "Login"}
          </span>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
