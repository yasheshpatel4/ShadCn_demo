import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppSelector, useAppDispatch } from './redux/hook'
import { fetchProducts } from './features/product/productSlice'
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'
import { Counter } from './features/counter/Counter'
import { ToDoList } from './features/todo/ToDoList'
import User from './features/user/User'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  
  const [page, setPage] = useState(1)
  const limit = 10

  const isFetching1 = status === 'loading'

  const handleFetch = () => {
    dispatch(fetchProducts())
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const fetchProducts1 = async (currentPage: number) => {
    const skip = (currentPage - 1) * limit;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts1(page),
    enabled: true,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  if (data) {
    console.log("Products:", data);
  }

  const handleFetch1 = () => {
    refetch();
  };

  return (
    <div className="flex h-screen bg-muted/40">
      <aside className="w-64 border-r bg-background hidden md:flex flex-col">
        <div className="p-6 font-bold text-xl flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> My Dashboard
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="w-4 h-4" /> Users
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="w-4 h-4" /> Settings
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {[
            { title: 'Total Revenue', value: '$45,231.89', trend: '+20.1%' },
            { title: 'Subscriptions', value: '+2350', trend: '+180.1%' },
            { title: 'Sales', value: '+12,234', trend: '+19%' },
            { title: 'Active Now', value: '+573', trend: '+201' },
          ].map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 bg-white rounded-lg border mb-6">
          <div className="flex gap-2 mb-4">
            <Button 
              variant="default" 
              className="flex-1 gap-2" 
              onClick={handleFetch1} 
              disabled={isFetching}
            >
              {isFetching ? 'Fetching...' : 'Fetch Products (Query)'}
            </Button>
          </div>
          
          {data && (
            <div className="flex items-center justify-between border-t pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-sm font-medium">Page {page}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)}
                disabled={(data && page * limit >= data.total) || isFetching}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
          {isLoading && <p className="mt-2 text-sm text-center">Loading...</p>}
          {data && <p className="mt-2 text-sm text-center text-green-600">Showing {data.products?.length} products</p>}
        </div>

        <div className="p-4 bg-white rounded-lg border mb-6">
          <Button 
            variant="default" 
            className="w-full gap-2" 
            onClick={handleFetch} 
            disabled={isFetching1}
          >
            {isFetching1 ? 'Fetching...' : 'Fetch Products'}
          </Button>
          {status === 'loading' && (
            <p className="mt-2 text-sm text-center">Loading from API...</p>
          )}
          {status === 'succeeded' && (
            <p className="mt-2 text-sm text-center text-green-600">
              Successfully loaded {items.length} products!
            </p>
          )}
          {status === 'failed' && (
            <p className="mt-2 text-sm text-center text-red-500">
              Error: {error}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <Counter />
          <ToDoList />
          <User/>
        </div>
      </main>
    </div>
  );
};  