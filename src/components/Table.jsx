import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import ImageCell from "./../utils/ImageCell";
import FormatRupiah from "../utils/FormatRupiah";
import { ThemeContext } from "../contexts/theme";
import { Modal, ModalDelete, ModalEdit } from "../components/Modal";
import withAuth from "../hooks/withAuth";
import cookie from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
const Table = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [filter, setFilter] = useState("");
  const filteredProducts = products?.filter(
    (product) =>
      product.name && product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const { mode } = useContext(ThemeContext);

  const token = cookie.get("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://api-stockit.up.railway.app/api/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.data);
    };

    fetchData();
  }, [token]);

  const handleDelete = (id) => {
    setOpenDelete(true);
    setSelectedId(id);
  };

  const handleEdit = (id) => {
    setOpenEdit(true);
    setSelectedId(id);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => <span className="capitalize">{row.name}</span>,
    },
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => <ImageCell value={row.image} />,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Purchase Price",
      selector: (row) => row.purchasePrice,
      cell: (row) => <FormatRupiah value={row.purchasePrice} />,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => row.sellingPrice,
      cell: (row) => <FormatRupiah value={row.sellingPrice} />,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (id) => (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleEdit(id)}
            className="rounded bg-blue-700 hover:bg-blue-800 text-white py-1 px-3 capitalize"
          >
            edit
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="rounded bg-red-700 hover:bg-red-800 text-white py-1 px-3 capitalize"
          >
            delete
          </button>
        </div>
      ),
    },
  ];

  createTheme("dark", {
    background: {
      default: "transparent",
    },
    text: {
      primary: mode === "light" ? "#111" : "#bbb",
    },
    divider: {
      default: mode === "light" ? "#111" : "#bbb",
    },
  });

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: mode === "light" ? "#111" : "#bbb",
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        color: mode === "light" ? "#bbb" : "#111",
      },
    },
    pagination: {
      style: {
        color: mode === "light" ? "#111" : "#bbb",
      },
    },
    paginationButton: {
      style: {
        backgroundColor: mode === "light" ? "#111" : "#bbb",
      },
    },
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between my-4">
        <div
          className="rounded bg-blue-700 hover:bg-blue-800 md:px-2 md:py-1 p-1 md:text-sm text-sm capitalize text-white cursor-pointer"
          onClick={() => setOpen(true)}
        >
          create product
        </div>
        <input
          type="text"
          className="border text-black border-slate-500 rounded md:px-2 md:py-1 p-1 placeholder:md:text-sm text-sm"
          placeholder="Search product..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <DataTable
        responsive="true"
        data={filteredProducts}
        columns={columns}
        theme="dark"
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        dense
        customStyles={customStyles}
      />

      {/* popup modal */}
      {open && <Modal name={"create"} onClose={() => setOpen(false)} />}

      {/* popup confirmation delete */}
      {openDelete && (
        <ModalDelete
          name={"delete"}
          onClose={() => setOpenDelete(false)}
          selectedId={selectedId._id}
        />
      )}

      {/* popup modal edit */}
      {openEdit && (
        <ModalEdit
          name={"edit"}
          onClose={() => setOpenEdit(false)}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Table);
