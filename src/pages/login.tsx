import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetching } from "../utils/api";
import { setCookie } from "../utils/cookie";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handelClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      const form = getValues();
      const res = await fetching("/api/login", "POST", form);
      const data = await res?.json();
      if (res?.ok) {
        setCookie("token", data.token);
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 shadow-lg rounded-md py-4 px-6'>
          <h1 className='text-center font-semibold text-6xl mb-16'>Login</h1>
          <div className='mb-4'>
            <label className='inline-block text-sm font-medium mb-1 text-gray-600'>
              Email
            </label>
            <input
              className={`p-3 w-full border-2 outline-none rounded-md ${
                errors.email
                  ? "border-red-500 text-red-500"
                  : "border-gray-400 text-gray-950"
              }`}
              type='text'
              {...register("email")}
            />
            {errors.email && (
              <span className='text-red-500 text-xs mt-1'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label className='inline-block text-sm font-medium mb-1 text-gray-600'>
              Password
            </label>
            <input
              className={`p-3 w-full border-2 outline-none rounded-md ${
                errors.email
                  ? "border-red-500 text-red-500"
                  : "border-gray-400 text-gray-950"
              }`}
              type='password'
              {...register("password")}
            />
            {errors.password && (
              <span className='text-red-500 text-xs mt-1'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className='flex justify-center items-center pt-6'>
            <button
              className='bg-gray-950 text-white px-10 py-3 rounded-md font-semibold cursor-pointer w-full'
              onClick={handelClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
