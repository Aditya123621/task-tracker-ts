import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  isDrawerOpen: {
    status: boolean;
    helperData: Record<string, any> | null; // Replace `any` with a more specific type if possible
  };
}

const initialState: DrawerState = {
  isDrawerOpen: { status: false, helperData: null },
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<Record<string, any> | null>) => {
      state.isDrawerOpen.status = true;
      state.isDrawerOpen.helperData = action?.payload || null;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen.status = false;
      state.isDrawerOpen.helperData = null;
    },
  },
});

export const { closeDrawer, openDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
