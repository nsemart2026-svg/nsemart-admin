import React from "react";

const ErrorMessage = () => {
  return (
    <div
      className="text-center p-4 border rounded-lg bg-red-100
     text-red-600 shadow-md md:w-2/3 xl:w-1/2 mx-auto"
    >
      <p className="text-lg font-semibold">Something went wrong!</p>
      <p className="mt-2 text-sm">
        Try refreshing the page or check your internet connection.
      </p>
    </div>
  );
};

export default ErrorMessage;
