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
import useSignup from "@/Zustand/useSignup";
import { ArrowRight } from "lucide-react";

export function SignupTwo() {
  const { handleChange, handleSubmit, isLoading , formdata} = useSignup();
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Create Free Account <ArrowRight /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
      <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="username"
                type="text"
                placeholder="John Doe"
                required
                onChange={handleChange}
                value={formdata.username}
              />
            </Field>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
              {isLoading ? <Spinner className="size-4 text-gray-100"/> : 'Create Account'}
            </Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  );
}
export default React.memo(SignupTwo);
