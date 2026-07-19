import { BrowserRouter, Route, Routes } from "react-router";
import { PageHome } from "./pages/page-home";
import { PagePhotoDetails } from "./pages/page-photo-details";
import { LayoutMain } from "./pages/layout-main";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
			<Routes>
				<Route element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/fotos/:id" element={<PagePhotoDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
		</QueryClientProvider>
	)
}
