import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../routes";

export function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT}>About Us</Link>
          </li>
          <li>
            <Link to={ROUTES.USERS}>Users</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
