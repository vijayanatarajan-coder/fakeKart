import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearProductCreated } from "../../Slices/ProductSlice";
import { createNewProduct } from "../../Actions/ProductAction";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
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
    "Cloths/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoors",
    "Home",
  ];
  const navigate = useNavigate();
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
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
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
  }, [isProductCreated, error, dispatch, navigate]);

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
            aria-label="Create New Product Form"
          >
            <header>
              <h1 className="mb-4" tabindex="1">
                New Product
              </h1>
            </header>

            <fieldset>
              <legend className="sr-only">Product Information</legend>

              <section className="form-group">
                <label htmlFor="name_field" tabindex="2">
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  tabindex="3"
                />
              </section>

              <section className="form-group">
                <label htmlFor="price_field" tabindex="4">
                  Price
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                  tabindex="5"
                />
              </section>

              <section className="form-group">
                <label htmlFor="description_field" tabindex="6">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                  tabindex="7"
                ></textarea>
              </section>

              <section className="form-group">
                <label htmlFor="category_field" tabindex="8">
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                  required
                  tabindex="9"
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
                <label htmlFor="stock_field" tabindex="10">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  required
                  tabindex="11"
                />
              </section>

              <section className="form-group">
                <label htmlFor="seller_field" tabindex="12">
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                  required
                  tabindex="13"
                />
              </section>

              <section className="form-group">
                <label htmlFor="customFile" tabindex="14">
                  Images
                </label>
                <section className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                    aria-describedby="imageUploadHelp"
                    tabindex="15"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="customFile"
                    tabindex="16"
                  >
                    Choose Images
                  </label>
                </section>

                <section
                  className="preview-images mt-3 d-flex flex-wrap"
                  tabindex="17"
                >
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
              </section>
            </fieldset>

            <footer>
              <button
                id="submit_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
                tabindex="18"
              >
                {loading ? "Creating..." : "CREATE"}
              </button>
            </footer>
          </form>
        </section>
      </main>
    </section>
  );
}
