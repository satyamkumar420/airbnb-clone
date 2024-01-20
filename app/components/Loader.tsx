"use client";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <PuffLoader color="red" size={100} />
    </div>
  );
};

export default Loader;
