import { createSlice } from '@reduxjs/toolkit';

interface ManagerState {
  isManagerToolsVisible: boolean;
}

const initialState: ManagerState = {
  isManagerToolsVisible: false,
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    toggleManagerTools: (state) => {
      state.isManagerToolsVisible = !state.isManagerToolsVisible;
    },
    setManagerToolsVisible: (state, action) => {
      state.isManagerToolsVisible = action.payload;
    },
  },
});

export const { toggleManagerTools, setManagerToolsVisible } = managerSlice.actions;
export default managerSlice.reducer;
