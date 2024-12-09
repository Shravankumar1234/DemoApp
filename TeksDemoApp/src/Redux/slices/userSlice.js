import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    loading: false,
    error: null,
    moreData: true,
  },
  reducers: {
    // Start Loading
    startLoading(state) {
      state.loading = true;
    },
    // Stop LOADING
    stopLoading(state) {
      state.loading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Get User List
    GetUserList(state, action) {
      const newUserList = action.payload?.map(newItem => {
        const existingUserIndex = state.userList.findIndex(
          existingUser => existingUser?.login?.uuid === newItem?.login?.uuid,
        );
        if (existingUserIndex !== -1) {
          state.userList[existingUserIndex] = newItem;
        } else {
          return newItem;
        }
      });
      const filterData = newUserList?.filter(item => item != null);
      state.userList = [...state.userList, ...filterData];
    },
    // moreData
    GetmoreData(state, action) {
      state.moreData = action.payload;
    },
  },
});
export const {startLoading, stopLoading, hasError, GetUserList, GetmoreData} =
  userSlice.actions;

//   Function to GetUser List
export const GetUsers = async (page, dispatch) => {
  dispatch(userSlice.actions.startLoading());
  return axios
    .get(`https://randomuser.me/api/?results=10&page=${page}`)
    .then(res => {
      dispatch(userSlice.actions.stopLoading());
      dispatch(userSlice.actions.GetUserList(res.data?.results));
      return 'SUCCESS';
    })
    .catch(err => {
      dispatch(userSlice.actions.stopLoading());
      dispatch(userSlice.actions.hasError(err.message));
    });
};

export default userSlice.reducer;
