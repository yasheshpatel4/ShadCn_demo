import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginForm } from './Loginform'
import Dashboard from './Dashboard'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>      
    </QueryClientProvider>
  </React.StrictMode>,
)
