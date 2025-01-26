import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useNotification } from "../components/NotifContext";
import { fetching } from "../utils/api";
import { UserOptions } from "./Users";

const User = () => {
  const [user, setUser] = useState<UserOptions>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const { addNotification } = useNotification();

  const fetchData = async () => {
    const res = await fetching(`/api/users/${id}`, "GET");
    const jsonData = await res?.json();
    if (res?.ok) {
      setUser(jsonData.data);
    }
  };

  const goToEdit = (id: number) => {
    navigate("/updateUser", { state: { id } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteUser = async () => {
    const res = await fetching(`/api/users/${user?.id}`, "DELETE");
    if (res?.status === 204) {
      closeModal();
      navigate("/users?page=1");
      addNotification({
        message: "User deleted successfully",
        type: "Success",
      });
    }
  };

  return (
    <div className='px-8 py-6'>
      <div className='flex flex-col items-center'>
        <div className='rounded-full w-16 h-16 scale-105 overflow-hidden'>
          <img src={user?.avatar} alt={user?.first_name} />
        </div>
        <div className='flex my-8'>
          <p className='font-bold mr-2'>{user?.first_name}</p>
          <p className='font-bold'>{user?.last_name}</p>
        </div>
        <div className='text-center md:flex md:text-left items-center'>
          <p className='font-bold text-lg md:mr-2'>Email</p>
          <p className='text-sm'>{user?.email}</p>
        </div>
        <div className='w-full flex justify-around sm:justify-center mt-10'>
          <button
            className='bg-orange-500 text-white rounded-md px-4 py-2 font-semibold cursor-pointer sm:mr-3'
            onClick={() => goToEdit(user?.id!)}>
            Edit Info
          </button>
          <button
            className='bg-red-600 text-white rounded-md px-4 py-2 font-semibold cursor-pointer'
            onClick={() => setShowModal(true)}>
            Delete User
          </button>
        </div>
      </div>
      <Modal show={showModal}>
        <div className='px-8 py-4 min-h-32'>
          <p className='font-semibold text-lg mb-3'>Delete User</p>
          <p>Do you want to delete this user? This action cannot be undone</p>
          <div className='flex flex-row-reverse mt-3 '>
            <button
              className='bg-red-500 text-white rounded-md px-4 py-2 font-semibold cursor-pointer mr-2'
              onClick={deleteUser}>
              Yes
            </button>
            <button
              className='bg-black text-white rounded-md px-4 py-2 font-semibold cursor-pointer mr-2'
              onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default User;
