import { NavLink } from "react-router-dom";

const NotAuthenticated = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <p className='mt-14'>Yor are not authenticated</p>
      <div className='mt-14'>
        <NavLink
          to='/login'
          className='px-8 py-4 bg-black text-white rounded-md'>
          Please Login
        </NavLink>
      </div>
    </div>
  );
};

export default NotAuthenticated;
