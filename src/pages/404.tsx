import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <p className='mt-14'>Not founded</p>
      <div className='mt-14'>
        <NavLink
          to='/dashboard'
          className='px-8 py-4 bg-black text-white rounded-md'>
          Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
