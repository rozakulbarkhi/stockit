// eslint-disable-next-line react/prop-types
const ImageCell = ({ value }) => {
  return (
    <img
      src={value}
      alt={`product image`}
      className="object-cover w-16 h-16 my-2"
    />
  );
};

export default ImageCell;
