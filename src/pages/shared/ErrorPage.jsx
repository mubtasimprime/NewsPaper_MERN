import { Link } from "react-router";
import ErrorImg from "../../assets/error-404.jpg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 lg:p-0">
      <div>
        <img
          className="max-w-[400px] lg:max-w-[550px] mx-auto"
          src={ErrorImg}
          alt=""
        />
      </div>
      <div className="text-center">
        <h1 className="text-[32px] text-blue-600 lg:text-[40px] font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-[18px] text-gray-700 lg:text-xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </div>
      <div className="mx-auto mt-4 lg:mt-8 mb-4">
        <Link to="/">
          <button className="bg-blue-600 py-2.5 px-7 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-800 duration-300 text-[17px]">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
