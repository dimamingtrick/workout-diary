import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Container, Row, Col, Button, Form, Spinner } from "reactstrap";

import { useStores } from "../../hooks";
import { useRegistration } from "./hooks";
import { Input, Card, CardTitle } from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import AuthLink from "../../components/AuthLink";
import "./registration-page.scss";

const RegistrationPage: React.FC = () => {
  const { AuthStore } = useStores();
  const {
    email,
    name,
    password,
    confirmPassword,
    passwordsError,
    validate
  } = useRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    setIsLoading(true);

    AuthStore.signUp({
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  };

  return useObserver(() => (
    <Container fluid className="auth-page">
      <Card className="auth-card">
        <CardTitle>Registration</CardTitle>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            placeholder="Email..."
            label="Email"
            type="email"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onChange}
            valid={email.touched && email.error === ""}
            invalid={email.touched && email.error !== ""}
            error={email.error}
            disabled={isLoading}
          />

          <Input
            id="name"
            name="name"
            placeholder="Name..."
            label="Name"
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onChange}
            valid={name.touched && name.error === ""}
            invalid={name.touched && name.error !== ""}
            error={name.error}
            disabled={isLoading}
          />

          <Row form>
            <Col md={6}>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onChange}
                valid={!password.error && password.touched && !passwordsError}
                invalid={password.error !== "" || passwordsError !== ""}
                error={password.error}
                disabled={isLoading}
              />
            </Col>
            <Col md={6}>
              <Input
                id="confirmPassword"
                name="password"
                placeholder="Confirm password..."
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
                onBlur={confirmPassword.onChange}
                valid={
                  !confirmPassword.error &&
                  confirmPassword.touched &&
                  !passwordsError
                }
                invalid={passwordsError !== "" || confirmPassword.error !== ""}
                error={passwordsError}
                errorClassName="passwordsError"
                rightIcon={
                  <ShowPasswordIcon
                    show={showPassword}
                    onClick={handleClickShowPassword}
                  />
                }
                disabled={isLoading}
              />
            </Col>
          </Row>
          <Button className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? <Spinner color="light" size="sm" /> : "Sign Up"}
          </Button>
          <AuthLink to="/login" disabled={isLoading}>
            Sign In
          </AuthLink>
        </Form>
      </Card>
    </Container>
  ));
};

export default RegistrationPage;
