import useApiGet from "../Hooks/useApiGet";
import useApiPost from "../Hooks/useApiPost";
import useApiPut from "../Hooks/useApiPut";
import useApiDelete from "../Hooks/useApiDelete";

export const useGetNotifications = () => {
  return useApiGet(`/notification/get`);
};

export const useGetNotificationById = (id) => {
  return useApiGet(id ? `/notification/get/${id}` : null);
};

export const useCreateNotification = () => {
  const { postData, loading, error, response } = useApiPost();
  return {
    createNotification: (notificationData) =>
      postData("/notification/create", notificationData),
    loading,
    error,
    response,
  };
};

export const useUpdateNotification = () => {
  const { putData, loading, error, response } = useApiPut();
  return {
    updateNotification: (id, updateData) =>
      putData(`/notification/update/${id}`, updateData),
    loading,
    error,
    response,
  };
};

export const useDeleteNotification = () => {
  const { deleteData, loading, error, response } = useApiDelete();
  return {
    deleteNotification: (id) => deleteData(`/notification/delete/${id}`),
    loading,
    error,
    response,
  };
};
