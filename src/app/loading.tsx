import Loader from "@/components/UI/Loader";

const LoadingPage = () => {
  return (
    <div className="absolute h-full w-full inset-0 flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default LoadingPage;
