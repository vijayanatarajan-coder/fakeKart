import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar-wrapper" aria-label="Admin Sidebar">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard" tabindex="1">
              <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>

          <li>
            <NavDropdown
              title={
                <>
                  <i className="fa fa-product-hunt" aria-hidden="true"></i>
                  <span className="ml-2">Product</span>
                </>
              }
              id="product-menu"
              tabindex="2" // tabindex for the dropdown itself
            >
              <NavDropdown.Item
                onClick={() => navigate("/admin/products")}
                tabindex="3" // tabindex for the 'All' products item
              >
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                <span className="ml-2">All</span>
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate("/admin/products/create")}
                tabindex="4" // tabindex for the 'Create' product item
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
                <span className="ml-2">Create</span>
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
