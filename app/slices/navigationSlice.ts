import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Point } from "react-native-google-places-autocomplete";
import { RootState } from "../../app/store";

type DistanceMatrix = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
};

type NavigationState = {
  origin: { location: Point | undefined; description: string } | null;
  destination: { location: Point | undefined; description: string } | null;
  travelTimeInfo: DistanceMatrix | null;
};

const initialState: NavigationState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<NavigationState["origin"]>) => {
      state.origin = action.payload;
    },
    setDestination: (
      state,
      action: PayloadAction<NavigationState["destination"]>
    ) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state, action: PayloadAction<DistanceMatrix>) => {
      state.travelTimeInfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfo } =
  navigationSlice.actions;

export const selectOrigin = (state: RootState) => state.navigation.origin;
export const selectDestination = (state: RootState) =>
  state.navigation.destination;
export const selectTravelTimeInfo = (state: RootState) =>
  state.navigation.travelTimeInfo;

export default navigationSlice.reducer;
