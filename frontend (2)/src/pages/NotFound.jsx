import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h2 className="text-4xl font-bold text-red-600">404 - Page Not Found</h2>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
