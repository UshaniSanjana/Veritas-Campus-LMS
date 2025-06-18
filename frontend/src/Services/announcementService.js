import useApiGet from "../Hooks/useApiGet";
import useApiPost from "../Hooks/useApiPost";
import useApiPut from "../Hooks/useApiPut";
import useApiDelete from "../Hooks/useApiDelete";

export const useGetAnnouncements = () => {
  return useApiGet("/announcement/get");
};

export const useGetAnnouncementById = (id) => {
  return useApiGet(id ? `/announcement/get/${id}` : null);
};

export const useCreateAnnouncement = () => {
  const { postData, loading, error, response } = useApiPost();
  return {
    createAnnouncement: (announcementData) =>
      postData("/announcement/create", announcementData),
    loading,
    error,
    response,
  };
};

export const useUpdateAnnouncement = () => {
  const { putData, loading, error, response } = useApiPut();
  return {
    updateAnnouncement: (id, updateData) =>
      putData(`/announcement/update/${id}`, updateData),
    loading,
    error,
    response,
  };
};

export const useDeleteAnnouncement = () => {
  const { deleteData, loading, error, response } = useApiDelete();
  return {
    deleteAnnouncement: (id) => deleteData(`/announcement/delete/${id}`),
    loading,
    error,
    response,
  };
};
