const Footer = () => {
  return (
    <div>
      <div className="md:text-md text-sm flex justify-center items-center">
        &copy; {new Date().getFullYear()} Stock it. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
