"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignupSchema,
  TSignupSchema,
} from "@/modules/shared/entities/schema/auth/auth.schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { signupAction } from "@/modules/server/auth/presentation/actions/auth.actions";
import { toast } from "sonner";
import { handleZSAError } from "@/modules/client/shared/error/handleZSAError";

function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  const { execute } = useServerAction(signupAction, {
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success("Signup successful");
    },
    onError: ({ err }) => {
      handleZSAError<TSignupSchema>({
        err,
        form,
        fallbackMessage: "Signup failed",
      });
    },
  });

  function handlePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  async function handleSignup(values: TSignupSchema) {
    await execute(values);
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Sign Up</FieldLegend>
                <FieldDescription>Signup to your account</FieldDescription>
                <FieldGroup>
                  {/* name */}
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your name"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* email */}
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="example@gmail.com"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* password */}
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="******"
                            autoComplete="off"
                            type={isPasswordVisible ? "text" : "password"}
                          />
                          <InputGroupAddon
                            align="inline-end"
                            className="cursor-pointer"
                            onClick={handlePasswordVisibility}
                          >
                            {isPasswordVisible ? <EyeOff /> : <Eye />}
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Sign Up
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Signup;
