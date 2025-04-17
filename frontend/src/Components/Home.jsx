import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./Layouts/MetaData";
import { getProducts } from "../Actions/ProductsActions";
import Loader from "./Layouts/Loader";
import { toast } from "react-toastify";
import Product from "./Product/Product";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.productsState);

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    } else {
      const finalResPerPage = resPerPage || 3;
      dispatch(getProducts(currentPage, finalResPerPage));
    }
  }, [dispatch, error, currentPage, resPerPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Products"} />

          <header>
            <h1 id="products_heading">Latest Products</h1>
          </header>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              ) : (
                <div>No products available at the moment.</div>
              )}
            </div>
          </section>

          {/* Pagination section */}
          {productsCount > 0 && productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount || 0}
                itemsCountPerPage={resPerPage || 1}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
