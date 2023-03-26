import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Tab from "../components/Tab";
import AddIcon from "@mui/icons-material/Add";

import useAdmin from "../hooks/useAdmin";
import { setProducts } from "../redux/actions";
import getProducts from "../utils/getProducts";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
function Home({ user, products, filteredProducts, setProducts }) {
  const auth = useAuth();
  const [filter, setFilter] = useState("default");
  const admin = useAdmin();
  const history = useHistory();
  const [adminError, setAdminError] = useState(false);

  async function defaultProducts() {
    const productsList = await getProducts();

    setProducts(productsList);
  }

  async function newProducts() {
    const productsList = await getProducts();

    setProducts(productsList.reverse());
  }

  const handleSort = (e) => {
    setFilter(e.target.value);
    const tempProducts = [...products];
    if (e.target.value === "lh") {
      tempProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProducts(tempProducts);
    } else if (e.target.value === "hl") {
      tempProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
      setProducts(tempProducts);
    } else if (e.target.value === "new") {
      console.log("Handling Newest Products");
      newProducts();
    } else {
      defaultProducts();
    }
  };

  return (
    <div>
      <Navbar user={user} />
      {auth && (
        <div className="px-3 sm:px-16 md:px-32 py-16">
          <div className="flex items-center justify-center">
            <Tab />
          </div>

          <div className="select-header w-full my-6">
            <div className="w-[235px]">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="Filter"
                  onChange={handleSort}
                >
                  <MenuItem value={"default"}>Default</MenuItem>
                  <MenuItem value={"hl"}>Price: High to Low</MenuItem>
                  <MenuItem value={"lh"}>Price:Low to High</MenuItem>
                  <MenuItem value={"new"}>Newest</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="products w-full my-12">
            <Grid container spacing={2}>
              {filteredProducts.length > 0
                ? filteredProducts.map((product, index) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <ProductCard
                          product={product}
                          setAdminError={setAdminError}
                        />
                      </Grid>
                    );
                  })
                : products.map((product, index) => {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <ProductCard
                          product={product}
                          setAdminError={setAdminError}
                        />
                      </Grid>
                    );
                  })}
            </Grid>
          </div>
        </div>
      )}
      {admin && (
        <div
          style={{
            position: "fixed",
          }}
          className="left-[50%] translate-x-[-50%] bottom-10 block md:hidden"
        >
          <Fab
            variant="extended"
            color="primary"
            onClick={() => {
              history.push("/product/new");
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Product
          </Fab>
        </div>
      )}
      <Snackbar
        open={adminError}
        autoHideDuration={6000}
        onClose={() => {
          setAdminError(true);
        }}
        message="Admin can't buy an product"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  products: state.appReducer.products,
  filteredProducts: state.appReducer.filteredProducts,
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (products) => dispatch(setProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
