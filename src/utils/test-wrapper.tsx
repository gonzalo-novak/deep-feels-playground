import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../routes";

export const testWrapper = (initialEntries: string[], initialIndex?: number) => {
	const router = createMemoryRouter(
		routes, {
			// It refers to the available routes in this context:
			initialEntries,
			// The initial router where the application will start.
			initialIndex: initialIndex || 0,
		}
	);
	return render(<RouterProvider router={router} />);
}
