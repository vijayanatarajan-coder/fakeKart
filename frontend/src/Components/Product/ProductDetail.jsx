import React, { useEffect } from "react";
import { getProduct } from "../../Actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../Layouts/MetaData";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productState
  );

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    } else {
      dispatch(getProduct(id));
    }
  }, [dispatch, id, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : product ? (
        <>
          <MetaData title={product.name} />

          <main
            className="product-detail"
            aria-label={`Details about ${product.name}`}
          >
            <section className="row f-flex justify-content-around">
              <figure className="col-12 col-lg-5 img-fluid" id="product_image">
                <img
                  src={product.images[0].image}
                  alt={product.name}
                  height="500"
                  width="500"
                  loading="lazy"
                />
                <figcaption className="sr-only">{product.name}</figcaption>
              </figure>

              <section
                className="col-12 col-lg-5 mt-5"
                aria-labelledby="product_title"
              >
                <header>
                  <h1 id="product_title">{product.name}</h1>
                  <p id="product_id">Product # {product._id}</p>
                </header>

                <section
                  className="rating"
                  aria-label={`Rated ${product.rating} out of 5 by ${product.numberOfReviews} users`}
                >
                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{ width: `${(product.rating / 5) * 100}%` }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <span id="no_of_reviews">
                    ({product.numberOfReviews} Reviews)
                  </span>
                </section>

                <section
                  aria-label="Product pricing and stock status"
                  tabIndex="0"
                >
                  <p id="product_price" aria-label={`Price: $${product.price}`}>
                    ${product.price}
                  </p>

                  <p>
                    <span
                      className={product.stock > 0 ? "greenColor" : "redColor"}
                      id="stock_status"
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                </section>

                <section
                  className="product-description"
                  aria-labelledby="product_description_heading"
                  tabIndex="0"
                >
                  <h2 className="mt-2 h4" id="product_description_heading">
                    Description
                  </h2>
                  <p>{product.description}</p>
                </section>

                <footer>
                  <p id="product_seller" className="mb-3">
                    Sold by: <strong>{product.seller}</strong>
                  </p>

                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    aria-label="Open review form for this product"
                  >
                    Submit Your Review
                  </button>
                </footer>
              </section>
            </section>
          </main>
        </>
      ) : (
        <h1>No product found</h1>
      )}
    </>
  );
};

export default ProductDetail;
