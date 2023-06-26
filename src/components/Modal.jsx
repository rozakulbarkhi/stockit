import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import cookie from "js-cookie";

// eslint-disable-next-line react/prop-types
const Modal = ({ name, onClose }) => {
  const [submit, setSubmit] = useState(false);

  const handleOnClose = (e) => {
    e.target.id === "container" && onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = cookie.get("token");

    try {
      setSubmit(true);

      const formData = new FormData(e.target);

      const response = await axios(
        "https://api-stockit.up.railway.app/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          data: formData,
        }
      );

      if (response.status === 201) {
        onClose();
        toast.success(response.data.message, {
          style: {
            fontSize: "12px",
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setSubmit(false);

      if (err.response.data.message.includes("Product validation failed")) {
        console.log(err.response.data);
        return toast.error("Input can't be less than 1", {
          style: {
            fontSize: "12px",
          },
        });
      }

      return toast.error(err.response.data.message, {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center transition ease-in-out duration-300"
    >
      <div className="bg-white rounded p-4 md:w-1/4 w-3/4 text-black">
        <div className="tracking-wider capitalize mb-3 font-medium">
          <div>{name} product</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            placeholder="Input name..."
            type="text"
            name="name"
            id="name"
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />

          <input
            placeholder="Input stock..."
            type="number"
            name="stock"
            id="stock"
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            placeholder="Input purchase price..."
            type="number"
            name="purchasePrice"
            id="purchasePrice"
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            placeholder="Input selling price..."
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            type="file"
            placeholder="Input image..."
            name="image"
            id="image"
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />

          {submit ? (
            <button
              disabled={true}
              className="p-2 my-3 bg-slate-600 rounded text-white md:text-sm text-sm capitalize"
            >
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 my-3 cursor-pointer bg-blue-700 hover:bg-blue-800 rounded text-white md:text-sm text-sm capitalize"
            >
              submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ModalDelete = ({ name, onClose, selectedId }) => {
  const handleOnClose = (e) => {
    e.target.id === "container" && onClose();
  };

  const handleDelete = async () => {
    const token = cookie.get("token");

    try {
      const response = await axios(
        `https://api-stockit.up.railway.app/api/products/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onClose();
        toast.success(response.data.message, {
          style: {
            fontSize: "12px",
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center transition-all"
    >
      <div className="bg-white rounded p-4 md:w-1/4 w-3/4 text-black">
        <div className="tracking-wider capitalize mb-3 font-medium">
          <div>{name} product</div>
        </div>
        <div className="text-sm md:text-sm">
          <p>Are you sure for delete this product?</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="md:px-2 md:py-1.5 py-1 px-2 capitalize rounded bg-red-700 hover:bg-red-800 text-white md:text-sm text-sm mt-5"
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ModalEdit = ({ name, onClose, selectedId, setSelectedId }) => {
  const [submit, setSubmit] = useState(false);

  const handleOnClose = (e) => {
    e.target.id === "container" && onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = cookie.get("token");

    try {
      setSubmit(true);

      const formData = new FormData(e.target);

      const response = await axios(
        `https://api-stockit.up.railway.app/api/products/${selectedId._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          data: formData,
        }
      );

      if (response.status === 200) {
        onClose();

        toast.success(response.data.message, {
          style: {
            fontSize: "12px",
          },
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setSubmit(false);

      if (err.response.data.message.includes("Product validation failed")) {
        console.log(err.response.data);
        return toast.error("Input can't be less than 1", {
          style: {
            fontSize: "12px",
          },
        });
      }

      if (err.response.data.message.includes("File too large")) {
        console.log(err.response.data);
        return toast.error("File too large, maks 100kb", {
          style: {
            fontSize: "12px",
          },
        });
      }

      return toast.error(err.response.data.message, {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center transition ease-in-out duration-300"
    >
      <div className="bg-white rounded p-4 md:w-1/4 w-3/4 text-black">
        <div className="tracking-wider capitalize mb-3 font-medium">
          <div>{name} product</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            placeholder="Input name..."
            type="text"
            name="name"
            id="name"
            value={selectedId.name}
            onChange={(e) => {
              setSelectedId({
                ...selectedId,
                name: e.target.value,
              });
            }}
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            placeholder="Input stock..."
            type="number"
            name="stock"
            id="stock"
            value={selectedId.stock}
            onChange={(e) => {
              setSelectedId({
                ...selectedId,
                stock: e.target.value,
              });
            }}
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            placeholder="Input purchase price..."
            type="number"
            name="purchasePrice"
            id="purchasePrice"
            value={selectedId.purchasePrice}
            onChange={(e) => {
              setSelectedId({
                ...selectedId,
                purchasePrice: e.target.value,
              });
            }}
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <input
            placeholder="Input selling price..."
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            value={selectedId.sellingPrice}
            onChange={(e) => {
              setSelectedId({
                ...selectedId,
                sellingPrice: e.target.value,
              });
            }}
            required
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          <img
            src={selectedId.image}
            alt="product image"
            className="object-cover w-24 h-24"
          />
          <input
            type="file"
            placeholder="Input image..."
            name="image"
            id="image"
            {...(selectedId.image && { required: false })}
            className="border rounded p-2 mb-2 placeholder:md:text-sm text-sm"
          />
          {submit ? (
            <button
              disabled={true}
              className="p-2 my-3 bg-slate-600 rounded text-white md:text-sm text-sm capitalize"
            >
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 my-3 cursor-pointer bg-blue-700 hover:bg-blue-800 rounded text-white md:text-sm text-sm capitalize"
            >
              submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export { Modal, ModalDelete, ModalEdit };
