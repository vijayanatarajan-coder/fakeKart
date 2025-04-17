import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../Actions/ProductsActions";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { products = [] } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();
  let outOfStock = 0;
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  return (
    <section className="row">
      <aside className="col-12 col-md-2" aria-label="Sidebar">
        <Sidebar />
      </aside>

      <main className="col-12 col-md-10">
        <header>
          <h1 className="my-4" tabIndex={0}>
            Dashboard
          </h1>
        </header>

        <section className="row pr-4">
          <article className="col-xl-3 col-sm-6 mb-3" tabIndex={0}>
            <article className="card text-white bg-success o-hidden h-100">
              <div
                className="card-body text-center card-font-size"
                tabIndex={0}
              >
                <h2 className="h5">Products</h2>
                <strong>{products.length}</strong>
              </div>
              <footer className="card-footer text-white clearfix small z-1">
                <Link
                  to="/admin/products"
                  aria-label="View all products"
                  className="text-white d-flex justify-content-between align-items-center"
                  tabIndex={0}
                >
                  <span>View Details</span>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </Link>
              </footer>
            </article>
          </article>

          <article className="col-xl-3 col-sm-6 mb-3" tabIndex={0}>
            <article className="card text-white bg-warning o-hidden h-100">
              <div
                className="card-body text-center card-font-size"
                tabIndex={0}
              >
                <h2 className="h5">Out of Stock</h2>
                <strong>{outOfStock}</strong>
              </div>
            </article>
          </article>
        </section>
      </main>
    </section>
  );
};

export default Dashboard;
