import { useState, useEffect } from "react";
import { UserOptions } from "./Users";
import withAuth from "../components/withAuth";
import { useNotification } from "../components/NotifContext";
import { NavLink, useNavigate } from "react-router-dom";
import { fetching } from "../utils/api";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<UserOptions[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserOptions>();
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const fetchData = async () => {
    const res = await fetching(`/api/users?page=${page}`, "GET");
    const jsonData = await res?.json();
    if (res?.ok) {
      setUsers(jsonData.data);
      setTotal(jsonData.total);
    }
  };

  const pageHandel = () => {
    if (page === 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: UserOptions
  ) => {
    e.stopPropagation();
    setSelectedUser(user);
    setShowModal(true);
  };

  const deleteUser = async () => {
    const user = selectedUser;
    const res = await fetching(`/api/users/${user?.id}`, "DELETE");
    if (res?.status === 204) {
      closeModal();
      addNotification({
        message: "User deleted successfully",
        type: "Success",
      });
    }
  };

  return (
    <div className='px-6 py-3'>
      <nav className='flex w-full h-16 items-center fixed z-40 top-0 left-0 px-6 backdrop-blur-lg bg-transparent shadow-md'>
        <NavLink className='text-sm font-semibold mr-3' to='/logout'>
          Logout
        </NavLink>
        <NavLink className='text-sm font-semibold mr-3' to='/users'>
          Users
        </NavLink>
        <NavLink className='text-sm font-semibold mr-3' to='/createUser'>
          Create Users
        </NavLink>
      </nav>
      <main className='mt-36'>
        <div className='py-4 flex'>
          <div>
            <span className='font-bold mr-2'>Total Users</span>
            <span className='text-sm'>{total}</span>
          </div>
        </div>
        <div className='border-2 border-violet-500 rounded-md min-w-fit overflow-x-scroll'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='text-center px-4 py-3'></th>
                <th className='text-center px-4 py-3'>Name</th>
                <th className='text-center px-4 py-3'>Last Name</th>
                <th className='text-center px-4 py-3'>Email</th>
                <th className='text-center px-4 py-3'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  className={`${
                    i % 2
                      ? "bg-violet-200 text-violet-900"
                      : "bg-violet-900 text-violet-200"
                  }`}
                  onClick={() => navigate("/users/" + user.id)}
                  key={user.id}>
                  <td className='text-center px-4 py-3'>
                    <div className='w-8 h-8'>
                      <img
                        className='overflow-hidden rounded-full'
                        src={user.avatar}
                        alt=''
                      />
                    </div>
                  </td>
                  <td className='text-center px-4 py-3'>{user.first_name}</td>
                  <td className='text-center px-4 py-3'>{user.last_name}</td>
                  <td className='text-center px-4 py-3'>{user.email}</td>
                  <td className='text-center px-4 py-3'>
                    <button
                      className='bg-white text-red-500 rounded-md px-3 py-1 font-semibold cursor-pointer z-10'
                      onClick={(e) => onDelete(e, user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex w-full justify-center mt-4'>
          <button
            className='bg-black text-white rounded-md px-4 py-2 font-semibold cursor-pointer'
            onClick={pageHandel}>
            {page === 1 ? "Next" : "back"}
          </button>
        </div>
      </main>
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

export default withAuth(Dashboard);
