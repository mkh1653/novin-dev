import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetching } from "../utils/api";
import withAuth from "../components/withAuth";
import "../assets/styles/card.css";

export interface UserOptions {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Users = () => {
  const [users, setUsers] = useState<UserOptions[]>([]);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const res = await fetching(`/api/users?page=${page}`, "GET");
    const jsonData = await res?.json();
    if (res?.ok) {
      setUsers(jsonData.data);
    }
  };

  const pageHandel = () => {
    if (page === "1") {
      navigate(`/users?page=2`);
    } else {
      navigate(`/users?page=1`);
    }
  };

  return (
    <div className='px-6 py-3'>
      <h1 className='text-4xl font-bold my-4 ml-2'>Users List</h1>
      <div className='flex flex-wrap'>
        {users.map((user) => {
          return (
            <div key={user.id} className='w-full md:w-1/3 p-2'>
              <div
                className='card'
                onClick={() => navigate(`/users/${user.id}`)}>
                <div className='w-full mb-2 flex justify-center'>
                  <div className='rounded-full w-16 h-16 scale-105 overflow-hidden'>
                    <img src={user.avatar} />
                  </div>
                </div>
                <div className='divide-dashed divide-y divide-opacity-60 divide-gray-300'>
                  <div className='flex justify-center gap-3 py-5'>
                    <p className='font-bold text-lg mr-2'>{user.first_name}</p>
                    <p className='font-bold text-lg'>{user.last_name}</p>
                  </div>
                  <div className='pt-2 text-center'>
                    <p className='font-semibold'>Email</p>
                    <p className='text-sm truncate'>{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex w-full justify-center mt-4'>
        <button
          className='bg-black text-white rounded-md px-4 py-2 font-semibold cursor-pointer'
          onClick={pageHandel}>
          {page === "1" ? "Next" : "back"}
        </button>
      </div>
    </div>
  );
};

export default withAuth(Users);
