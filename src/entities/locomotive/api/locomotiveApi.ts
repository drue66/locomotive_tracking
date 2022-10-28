import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Method } from "../../../shared/constants/method";
import { ILocomotive, ILocomotiveFormValues } from "../models/ILocomotive";

const URI = 'locomotive';
const LOCOMOTIVE_TAG = 'Locomotive';

export const locomotiveApi = createApi({
  reducerPath: 'locomotiveApi',
  tagTypes: [LOCOMOTIVE_TAG],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    fetchList: builder.query<ILocomotive[], void>({
      query: () => ({
        method: Method.GET,
        url: `/${URI}`,
      }),
      providesTags: () => [LOCOMOTIVE_TAG],
    }),

    fetch: builder.query<ILocomotive, number>({
      query: (id) => ({
        method: Method.GET,
        url: `/${URI}/${id}`,
      }),
    }),

    create: builder.mutation<ILocomotive, ILocomotiveFormValues>({
      query: (formValues) => ({
        method: Method.POST,
        url: `/${URI}`,
        body: formValues,
      }),
      invalidatesTags: [LOCOMOTIVE_TAG],
    }),

    update: builder.mutation<ILocomotive, {id: number, formValues: ILocomotiveFormValues}>({
      query: ({id, formValues}) => ({
        method: Method.PUT,
        url: `/${URI}/${id}`,
        body: formValues,
      }),
      invalidatesTags: [LOCOMOTIVE_TAG],
    }),

    delete: builder.mutation<void, number>({
      query: (id) => ({
        method: Method.DELETE,
        url: `/${URI}/${id}`,
      }),
      invalidatesTags: [LOCOMOTIVE_TAG],
    }),
  }),
});