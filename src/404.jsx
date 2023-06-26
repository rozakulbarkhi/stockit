import NotFoundSvg from "/404.png";

const NotFound = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-3">
      <div className="uppercase text-xl tracking-widest">error not found</div>
      <img src={NotFoundSvg} alt="error not found" className="h-44 w-44" />
      <div className="mt-5">
        Redirect to{" "}
        <a href="/" className="underline hover:text-blue-300 text-blue-200">
          Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
