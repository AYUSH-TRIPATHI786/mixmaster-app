import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
	HomeLayout,
	About,
	Landing,
	Error,
	Newsletter,
	Cocktail,
	SinglePageError
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5
		}
	}
});
const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				loader: landingLoader(queryClient),
				element: <Landing />,
				errorElement: <SinglePageError />
			},
			{
				path: 'cocktail/:id',
				element: <Cocktail />,
				loader: singleCocktailLoader(queryClient),
				errorElement: <SinglePageError />
			},
			{
				path: 'newsletter',
				element: <Newsletter />,
				action: newsletterAction,
				errorElement: <SinglePageError />
			},
			{
				path: 'about',
				element: <About />,
				errorElement: <SinglePageError />
			}
		]
	}
]);
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
		</QueryClientProvider>
	);
};
export default App;
