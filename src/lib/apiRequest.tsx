import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" },
});

export function useGetData(endpoint: string, name: string) {
    const fetchData = async () => {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    };

    return useQuery(name, fetchData);
}

export function useAddData(endpoint: string, name: string) {
  console.log("react query:", endpoint)
    const queryClient = useQueryClient();

    const addData = async (data: any) => {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    };

    return useMutation(addData, {
        onSuccess: () => {
            queryClient.invalidateQueries(name);
        },
    });
}
