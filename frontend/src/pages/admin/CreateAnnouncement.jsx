import React, { useState } from "react";
import { useCreateAnnouncement } from "../../Services/announcementService";
import AnnouncementForm from "../../components/AnnouncementForm";

export default function CreateAnnouncement() {
  const [formData, setFormData] = useState({
    title: "",
    doneBy: "",
    status: "",
    message: "",
    sendTo: "",
  });

  const { createAnnouncement, loading, error, response } = useCreateAnnouncement();

  const handleSubmit = async (formData) => {
    const result = await createAnnouncement(formData);
    if (result) {
      setFormData({
        title: "",
        doneBy: "",
        status: "",
        message: "",
        sendTo: "",
      });
    }
    return result;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
      <AnnouncementForm
        initialValues={formData}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={response}
      />
    </div>
  );
}