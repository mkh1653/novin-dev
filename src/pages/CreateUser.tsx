import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNotification } from "../components/NotifContext";
import { fetching } from "../utils/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  job: yup
    .string()
    .required("Job is required")
    .min(3, "Job must be at least 3 characters"),
});

type FormData = {
  name: string;
  job: string;
};

const CreateUser = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({
    name: "",
    job: "",
  });
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { addNotification } = useNotification();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputs = { ...fields };
    const inputName = e.target.name;
    inputs[inputName] = e.target.value;
    setFields({ ...inputs });
  };

  const handelClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      const form = getValues();
      const res = await fetching("/api/users", "POST", form);
      if (res?.ok) {
        setFields({
          name: "",
          job: "",
        });
        addNotification({
          message: "New user created successfully",
          type: "Success",
        });
      }
    }
  };
  return (
    <div className='flex justify-center mt-16'>
      <div className='w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 px-6 py-3 shadow-lg rounded-md'>
        <h1 className='text-center font-bold text-3xl md:text-4xl mt-4 mb-12 ml-2'>
          Create New User
        </h1>
        <div className='mb-4'>
          <label className='inline-block text-sm font-medium mb-1 text-gray-600'>
            Name
          </label>
          <input
            className={`p-3 w-full border-2 outline-none rounded-md ${
              errors.name
                ? "border-red-500 text-red-500"
                : "border-gray-400 text-gray-950"
            }`}
            {...register("name")}
            onChange={handelChange}
          />
          {errors.name && (
            <span className='text-red-500 text-xs mt-1'>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className='mb-4'>
          <label className='inline-block text-sm font-medium mb-1 text-gray-600'>
            Job
          </label>
          <input
            className={`p-3 w-full border-2 outline-none rounded-md ${
              errors.job
                ? "border-red-500 text-red-500"
                : "border-gray-400 text-gray-950"
            }`}
            type='text'
            {...register("job")}
            onChange={handelChange}
          />
          {errors.job && (
            <span className='text-red-500 text-xs mt-1'>
              {errors.job.message}
            </span>
          )}
        </div>
        <button
          className='bg-green-500 text-white px-10 py-3 rounded-md font-semibold cursor-pointer w-full'
          onClick={handelClick}
          type='button'>
          Create New User
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
