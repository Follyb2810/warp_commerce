import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const baseUrl = 'http://localhost:5000/api';

export const getAntiForgeryToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/antiforgery`, {
      withCredentials: true,  
    });
    
    return response.headers['x-xsrf-token'];
  } catch (error) {
    console.error('Failed to get anti-forgery token', error);
    return null;
  }
};

export const baseDomain = createApi({
  reducerPath: 'baseDomainApi',
  refetchOnMountOrArgChange: 5,  
  keepUnusedDataFor: 5,          
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl,             
    credentials: 'include', 
    prepareHeaders: async (headers, ) => {
      try {
        // const token = await getAntiForgeryToken();
        // console.log(token, 'after api anti-forgery token');
        // if (token) {
        // //   headers.set('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
        // }
        // console.log(headers);
        return headers;
      } catch (error) {
        console.error('Error preparing headers', error);
        return headers; 
      }
    //   return headers;
    },
  }),
  endpoints: () => ({}),
});


