import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
});

// Hook for fetching data
export function useGetData(endpoint: string) {
    const name = endpoint.split("/")[1];
    const fetchData = async () => {
        const response = await axios.get(`/api${endpoint}`);
        return response.data;
    };

    return useQuery(name, fetchData);
}

// Hook for adding data
export function useAddData(endpoint: string) {
    const queryClient = useQueryClient();
    const name = endpoint.split("/")[1];
    const addData = async (data: any) => {
        const response = await axios.post(`/api${endpoint}`, data);
        return response.data;
    };

    return useMutation(addData, {
        onSuccess: () => {
            queryClient.invalidateQueries(name);
        },
    });
}

// Hook for deleting data //
export function useDeleteData(endpoint: string) {
    const queryClient = useQueryClient();
    const name = endpoint.split("/")[1];
    const deleteData = async (id: string) => {
        const response = await axios.delete(`/api${endpoint}?id=${id}`);
        return response.data;
    };

    return useMutation(deleteData, {
        onSuccess: () => {
            queryClient.invalidateQueries(name);
        },
    });
}

// Hook for updating data using PATCH
export function useUpdateData(endpoint: string) {
    const queryClient = useQueryClient();
    const name = endpoint.split("/")[1];
    const updateData = async (data: any) => {
        const response = await axios.patch(`/api${endpoint}`, data);
        return response.data;
    };

    return useMutation(updateData, {
        onSuccess: () => {
            queryClient.invalidateQueries(name);
        },
    });
}

// Hook for updating entire data using PUT
export function useUpdateEntireData(endpoint: string) {
    const queryClient = useQueryClient();
    const name = endpoint.split("/")[1];
    const updateEntireData = async (data: any) => {
        const response = await axios.put(`/api${endpoint}`, data);
        return response.data;
    };

    return useMutation(updateEntireData, {
        onSuccess: () => {
            queryClient.invalidateQueries(name);
        },
    });
}
