import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Feedback } from "../types/feedback";
import FeedbackForm from "./FeedbackForm";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [editing, setEditing] = useState<Feedback | null>(null);

  const fetchAll = async () => {
    const snap = await getDocs(collection(db, "feedback"));
    setFeedbacks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Feedback)));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "feedback", id));
    fetchAll();
  };

  const handleEdit = (fb: Feedback) => {
    setEditing(fb);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4">
      <FeedbackForm
        editData={editing}
        onUpdate={() => {
          setEditing(null);
          fetchAll();
        }}
      />
      {feedbacks.map((fb) => (
        <FeedbackItem
          key={fb.id}
          data={fb}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
