import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    populate(_, action: PayloadAction<Task[]>) {
      return action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      return [...state, action.payload];
    },
    removeTask(state, action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload);
    }
  }
});

export const { populate, addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;