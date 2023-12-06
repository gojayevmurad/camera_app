import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICameraState {
  images: string[];
}

const initialState: ICameraState = {
  images: [],
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images = [...state.images, action.payload];
    },
    resetImages: (state) => {
      state.images = [];
    },
  },
});

export const { addImage, resetImages } = cameraSlice.actions;

export default cameraSlice.reducer;
