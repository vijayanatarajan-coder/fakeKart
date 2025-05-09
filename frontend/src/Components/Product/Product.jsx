import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [count, setCount] = useState(0);

  const handleViewDetailsClick = () => {
    const newCount = count + 1;
    if (window.gtag) {
      window.gtag("event", "view_product_details", {
        event_category: "product_interaction",
        event_label: product.name,
        product_id: product._id,
      });
    }
    setCount(newCount);
  };

  return (
    <article
      className="col-sm-12 col-md-6 col-lg-3 my-3"
      aria-label={`Product card for ${product.name}`}
    >
      <section className="card p-3 rounded">
        <header>
          <figure className="card-img-container mx-auto">
            <img
              className="card-img-top"
              src={product.images[0].image}
              alt={product.name}
              loading="lazy"
            />
            <figcaption className="sr-only">{product.name}</figcaption>
          </figure>
          <h2 className="card-title h5">
            <Link
              to={`/product/${product._id}`}
              aria-label={`View details of ${product.name}`}
              onClick={handleViewDetailsClick}
            >
              {product.name}
            </Link>
          </h2>
        </header>

        <section className="card-body d-flex flex-column">
          <div
            className="ratings mt-auto"
            aria-label={`Rating: ${product.rating} out of 5`}
          >
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
                aria-hidden="true"
              ></div>
            </div>
            <span aria-live="polite">({product.numberOfReviews} Reviews)</span>
          </div>

          <p className="card-text" aria-label={`Price: $${product.price}`}>
            ${product.price}
          </p>

          <footer>
            <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-block"
              aria-label={`View more details about ${product.name}`}
              onClick={handleViewDetailsClick}
              data-testid="view-details-button"
            >
              View Details
            </Link>
          </footer>
        </section>
      </section>
    </article>
  );
};

export default Product;
