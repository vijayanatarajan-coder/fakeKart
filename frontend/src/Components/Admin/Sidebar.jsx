import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar-wrapper" aria-label="Admin Sidebar">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
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
            >
              <NavDropdown.Item onClick={() => navigate("/admin/products")}>
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                <span className="ml-2">All</span>
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate("/admin/products/create")}
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
