import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { Button } from '../../components/ui/button'
import { decrement, increment } from '../counter/counterSlice'

export function Counter() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className='flex space-between justify-center'>
      <div className='flex gap-5'>
        <Button 
            variant="default" 
            className="w-25" 
            onClick={()=>dispatch(increment())}
        >
        Increment
        </Button>
        <span className=' bg-white border-2'>{count}</span>
        <Button 
            variant="default" 
            className="w-25" 
            onClick={()=>dispatch(decrement())}
        >
        Decrement
        </Button>
      </div>
    </div>
  )
}