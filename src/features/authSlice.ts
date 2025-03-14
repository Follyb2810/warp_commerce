import { Roles } from '@/@types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface User {
  id: string;
//   email: string;
  walletAddress: string;
  roles: Roles[];
}

interface IAuth {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: IAuth = {
  isAuthenticated: false,
  user: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

interface SetAuthenticatedPayload {
  isAuthenticated: boolean;
  user?: User | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { username, password } = action.payload;
      if (username === "admin" && password === "password") {
        state.isAuthenticated = true;
        state.user = {
          id: "1",
          walletAddress:'0x0000000000000000000000000000000000000000',
        //   email: "admin@example.com",
          roles: [Roles.ADMIN],
        };
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    setAuthenticated: (state, action: PayloadAction<SetAuthenticatedPayload>) => {
      const { isAuthenticated, user } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user ?? null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;