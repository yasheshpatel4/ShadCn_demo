import {
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

export type ToDoState = {

    tasks: {
        byId: {
            [key: string]: Task;
        };
        ids: string[];
    };
};

export const initialToDoState: ToDoState = {
    tasks: {
        byId: {},
        ids: [],
    },
};

const slice = createSlice({
    name: 'ToDo',
    initialState: initialToDoState,
    reducers: {
        taskAdded: (state, action: PayloadAction<Task>) => {
            const { id } = action.payload;
            state.tasks.byId[id] = action.payload;
            state.tasks.ids.push(id);
        },
        taskToggled: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.tasks.byId[id].completed = !state.tasks.byId[id].completed;
        },
        taskDeleted: (state, action : PayloadAction<string>) => {
            const id = action.payload;
            delete state.tasks.byId[id];
            state.tasks.ids = state.tasks.ids.filter((taskId) => taskId !== id);
        },
        taskEdit: (state, action : PayloadAction<Task>)=>{
            const { id } = action.payload;
            state.tasks.byId[id] = action.payload;
        }
    },
});

const { reducer } = slice;

export const { taskAdded, taskToggled, taskDeleted,taskEdit } = slice.actions;
export const selectAllTasks = (state: RootState) => 
    state.toDo.tasks.ids.map((id: string | number) => state.toDo.tasks.byId[id]);

export const selectCountOfCompletedTasks = (state: RootState) => 
    state.toDo.tasks.ids.filter((id: string | number) => state.toDo.tasks.byId[id].completed).length;

export default reducer;
