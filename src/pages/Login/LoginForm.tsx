import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { login, signUp } from "../../features/authSlice";
import "../../styles/LoginForm.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  const [currentState, setCurrentState] = useState<"Login" | "Sign up">(
    "Login"
  );

  const onFinish = (values: {
    userName: string;
    password: string;
    email?: string;
  }) => {
    if (currentState === "Sign up") {
      const existingUser = users.find(
        (user) => user.userName === values.userName
      );
      if (existingUser) {
        message.error("Username already taken!");
        return;
      }

      const newUser = {
        userName: values.userName,
        password: values.password,
        email: values.email || "",
        status: "Hey there, I am using the chat app",
      };

      dispatch(signUp(newUser));
      message.success("User signed up successfully!");
      setCurrentState("Login");
    } else {
      dispatch(login({ userName: values.userName, password: values.password }));
      const foundUser = users.find(
        (user) =>
          user.userName === values.userName && user.password === values.password
      );

      if (foundUser) {
        message.success("Login successful!");
      } else {
        message.error("Invalid username or password");
      }
    }
  };

  return (
    <div className="login">
      <Form className="login-form" onFinish={onFinish}>
        <h2>{currentState}</h2>
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
          <span
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign up" : "Login")
            }
          >
            {currentState === "Login" ? "Sign up" : "Login"}
          </span>
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
