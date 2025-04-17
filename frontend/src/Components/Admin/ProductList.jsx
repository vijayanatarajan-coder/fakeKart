import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../Actions/ProductsActions";
import { clearError, clearProductDeleted } from "../../Slices/ProductSlice";
import Loader from "../Layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { deleteProduct } from "../../Actions/ProductAction";

export default function ProductList() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product, index) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <div role="group" aria-label={`Actions for product ${product._id}`}>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary"
              aria-label="Edit product"
              title="Edit"
              tabindex={index * 3 + 1}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Link>

            <button
              type="button"
              onClick={(e) => deleteHandler(e, product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
              aria-label="Delete product"
              title="Delete"
              tabindex={index * 3 + 2}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Successfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, productError, isProductDeleted]);

  return (
    <section className="row">
      <aside className="col-12 col-md-2" aria-label="Sidebar">
        <Sidebar />
      </aside>

      <main className="col-12 col-md-10">
        <header>
          <h1 className="my-4" tabindex="1">
            Product List
          </h1>
        </header>

        <section
          aria-label="Product list table"
          className="px-3"
          aria-live="polite"
        >
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              responsive
              tabindex="2"
            />
          )}
        </section>
      </main>
    </section>
  );
}
