import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { Button } from '../components/ui/button';
import { 
  taskToggled, 
  taskDeleted, 
  taskEdit, 
  selectAllTasks, 
  selectCountOfCompletedTasks 
} from './reducer';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const countOfCompletedTasks = useAppSelector(selectCountOfCompletedTasks);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');



  return (
    <div>
      <div className="mb-4">
        <p className="font-medium">
          {countOfCompletedTasks} out of {tasks.length} tasks completed
        </p>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-4 p-2 border-b">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => dispatch(taskToggled(task.id))} 
          />

          {editingId === task.id ? (
            <input 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              className="border p-1 flex-grow"
            />
          ) : (
            <span className="flex-grow">{task.name}</span>
          )}

          <div className="flex gap-2">
            {editingId === task.id ? (
              <Button onClick={() => {
                dispatch(taskEdit({ ...task, name: tempName }));
                setEditingId(null);
              }}>
                Save
              </Button>
            ) : (
              <Button onClick={() => {
                setEditingId(task.id);
                setTempName(task.name);
              }}>
                Edit
              </Button>
            )}
            <Button variant="destructive" onClick={() => dispatch(taskDeleted(task.id))}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
