import { Alert, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import addProduct from "../utils/addProduct";
import modifyProduct from "../utils/modifyProduct";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModifyProduct({ user }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(false);
  const history = useHistory();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleAdd = async () => {
    const added = await addProduct({
      name: name,
      price: price,
      image: image,
      category: category,
      description: description,
      manufacturer: manufacture,
      availableItems: itemCount,
    });

    setChange(false);
    const NewState = {
      vertical: "top",
      horizontal: "right",
    };

    if (added === 201) {
      toast.success(`Product ${name} added successfully`, {
        position: "top-right",
        theme: "colored",
      });
      setState({ open: true, ...NewState });

      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <>
      <div>
        <Navbar user={user} />
        <div className="auth-body w-full h-[90%] flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-2xl">Add Product</h3>
            </div>

            <form className="flex flex-col items-start gap-3 w-[375px] lg:w-[575px]">
              <TextField
                id="outlined-basic"
                label="Name *"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => {
                  setChange(true);
                  setName(e.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Category *"
                variant="outlined"
                value={category}
                onChange={(e) => {
                  setChange(true);
                  setCategory(e.target.value);
                }}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Manufacturer *"
                variant="outlined"
                value={manufacture}
                onChange={(e) => {
                  setChange(true);
                  setManufacture(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Avialable Items *"
                variant="outlined"
                value={itemCount}
                type="number"
                onChange={(e) => {
                  setChange(true);
                  setItemCount(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Price *"
                variant="outlined"
                value={price}
                type="number"
                onChange={(e) => {
                  setChange(true);
                  setPrice(e.target.value);
                }}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Image Url *"
                variant="outlined"
                value={image}
                onChange={(e) => {
                  setChange(true);
                  setImage(e.target.value);
                }}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Product Description *"
                variant="outlined"
                value={description}
                onChange={(e) => {
                  setChange(true);
                  setDescription(e.target.value);
                }}
                multiline
                rows={4}
                fullWidth
              />

              <div className="w-full flex items-center flex-col">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAdd}
                  color={
                    !name ||
                    !description ||
                    !price ||
                    !manufacture ||
                    !itemCount ||
                    !image ||
                    !category ||
                    !change
                      ? "inherit"
                      : "primary"
                  }
                  disabled={
                    !name ||
                    !description ||
                    !price ||
                    !manufacture ||
                    !itemCount ||
                    !image ||
                    !category ||
                    !change
                      ? true
                      : false
                  }
                >
                  Add Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  products: state.appReducer.products,
  filteredProducts: state.appReducer.filteredProducts,
});

export default connect(mapStateToProps, null)(ModifyProduct);
