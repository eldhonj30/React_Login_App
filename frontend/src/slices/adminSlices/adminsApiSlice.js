import { apiSlice } from "../userSlices/apiSlice";

const ADMIN_URL = "/api/admin";

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});



export const {
  useAdminLoginMutation,
  useLogoutApiMutation,
} = adminsApiSlice;