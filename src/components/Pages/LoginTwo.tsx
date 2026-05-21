import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import useLogin from "@/Zustand/useLogin";

export function LoginTwo() {
  const { handleChange, handleSubmit, isLoading , formdata} = useLogin();
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer bg-green-800 text-gray-100 hover:bg-green-600 transition ease-in-out ">Sign in</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-zinc-900 text-gray-200">
          <DialogHeader>
            <DialogTitle>Login Your Account</DialogTitle>
          </DialogHeader>
      <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
                value={formdata.email}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                value={formdata.password}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer text-black" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
              {isLoading ? <Spinner className="size-4 text-gray-100"/> : 'Login'}
            </Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  );
}
export default React.memo(LoginTwo);
