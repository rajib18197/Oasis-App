import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LoginForm() {
  const [email, setEmail] = useState("jay@gmail.com");
  const [password, setPassword] = useState("jay1234");
  const { login, isPending, isError } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled() {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label={"Email Address"}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical label={"Password"}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button sizes="large" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}
