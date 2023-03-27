import { createSlice } from '@reduxjs/toolkit';

export const facesSlice = createSlice({
  name: 'faces',
  initialState: {
    face: 'front',
  },
  reducers: {
    changeFace: (state, action) => {
      state.face = action.payload;
    },
  },
});

export const { changeFace } = facesSlice.actions;

export default facesSlice.reducer;
