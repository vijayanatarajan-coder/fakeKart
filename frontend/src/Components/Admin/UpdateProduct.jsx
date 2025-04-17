import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../Actions/ProductAction";
import { clearProductupdated, clearError } from "../../Slices/ProductSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductupdated()),
      });
      setImages([]);
      return;
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product && product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product, productId]);

  return (
    <section className="row">
      <aside className="col-12 col-md-2" aria-label="Sidebar">
        <Sidebar />
      </aside>

      <main className="col-12 col-md-10">
        <section className="wrapper my-5">
          <form
            onSubmit={submitHandler}
            className="shadow-lg"
            encType="multipart/form-data"
            aria-label="Update Product Form"
          >
            <header>
              <h1 className="mb-4" tabIndex={0}>
                Update Product
              </h1>
            </header>

            <section className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                tabIndex={1}
              />
            </section>

            <section className="form-group">
              <label htmlFor="price_field">Price</label>
              <input
                type="text"
                id="price_field"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                tabIndex={2}
              />
            </section>

            <section className="form-group">
              <label htmlFor="description_field">Description</label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                tabIndex={3}
              ></textarea>
            </section>

            <section className="form-group">
              <label htmlFor="category_field">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                id="category_field"
                tabIndex={4}
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </section>

            <section className="form-group">
              <label htmlFor="stock_field">Stock</label>
              <input
                type="number"
                id="stock_field"
                className="form-control"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                tabIndex={5}
              />
            </section>

            <section className="form-group">
              <label htmlFor="seller_field">Seller Name</label>
              <input
                type="text"
                id="seller_field"
                className="form-control"
                onChange={(e) => setSeller(e.target.value)}
                value={seller}
                tabIndex={6}
              />
            </section>

            <fieldset className="form-group">
              <legend>Images</legend>

              <section className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onImagesChange}
                  aria-describedby="imageUploadHelp"
                  tabIndex={7}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </section>

              {imagesPreview.length > 0 && (
                <span
                  className="mr-2"
                  onClick={clearImagesHandler}
                  style={{ cursor: "pointer" }}
                  title="Clear all selected images"
                  tabIndex={8}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
              )}

              <section className="image-preview mt-3 d-flex flex-wrap">
                {imagesPreview.map((image) => (
                  <img
                    className="mr-2"
                    key={image}
                    src={image}
                    alt="Product preview"
                    width="55"
                    height="52"
                  />
                ))}
              </section>
            </fieldset>

            <footer>
              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
                tabIndex={9}
              >
                {loading ? "Updating..." : "UPDATE"}
              </button>
            </footer>
          </form>
        </section>
      </main>
    </section>
  );
}
