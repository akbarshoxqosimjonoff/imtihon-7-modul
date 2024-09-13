
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YourState {
  data: any[];
}

const initialState: YourState = {
  data: [],
};

const yourSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },

  },
});

export const { setData } = yourSlice.actions;
export default yourSlice.reducer;
