import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../routes";
import { ROUTES } from "./routes";

export const testWrapper = () => {
	const router = createMemoryRouter(
		routes, {
			// It refers to the available routes in this context:
			initialEntries: Object.values(ROUTES),
			// The initial router where the application will start.
			initialIndex: 0,
		}
	);
	return render(<RouterProvider router={router} />);
}
