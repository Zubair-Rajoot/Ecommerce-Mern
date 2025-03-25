import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Register User**
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/register`,
        userData,
        { headers: { "Content-Type": "multipart/form-data" } , withCredentials: true}
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// **Login User**
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/v1/login`, userData, { withCredentials: true });
      return { user: data.user, token: data.token }; // Assuming the token is returned in the response
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// **Load User (Token se logged-in user fetch karna)**
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/me", { withCredentials: true });
      console.log("data of use", data.user)
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
  
);


// **Update Profile**
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { user } = getState(); // Access the user state
      const token = user.token; // Assuming the token is stored in the user state

      const { data } = await axios.put(
        "http://localhost:4000/api/v1/me/update",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          withCredentials: true,
        }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



// Logout User
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`http://localhost:4000/api/v1/logout`, { withCredentials: true });

      return null; // User state ko null karne ke liye
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);






// **User Slice**
const userSlice = createSlice({
 
  name: "user",
  initialState: {
    user: null,
    token: null, // Add token to the initial state
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // **Register User Cases**
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **Login User Cases**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       

      // **Load User Cases**
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        
        console.log("User loaded:", action.payload); // Debugging ke liye
    })
    
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the user state with the new data
        state.isAuthenticated = true;
        console.log("Updated User State:", state.user); // Debugging
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
