// src/LoginPage.js

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsername = "test";
    const validPassword = "123";

    if (username === validUsername && password === validPassword) {
      console.log("Login Successful");
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Login to Your Account</Title>
        <InputWrapper>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Icon>
            <FaUser />
          </Icon>
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon>
            <FaLock />
          </Icon>
        </InputWrapper>

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;

// Add styled components from the previous example here
// Styled components for styling the login page

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #4a90e2, #50e3c2);
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 30px 12px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: #4a90e2;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #4a90e2;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #357ab7;
  }
`;
