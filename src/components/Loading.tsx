import loading from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen z-50">
      <img src={loading} alt="Loading"  className="w-16"/>
    </div>
  );
};

export default Loading;
