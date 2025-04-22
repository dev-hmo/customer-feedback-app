import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Feedback } from "../types/feedback";
import FeedbackForm from "./FeedbackForm";
import FeedbackItem from "./FeedbackItem";
import { useAuth } from "../context/AuthContext";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [editing, setEditing] = useState<Feedback | null>(null);
  const { user } = useAuth();

  const isAdmin = user?.email === "adminfeedback@gmail.com";

  const fetchAll = async () => {
    if (!user) {
      setFeedbacks([]);
      return;
    }

    let feedbackQuery;

    if (isAdmin) {
      feedbackQuery = collection(db, "feedback");
    } else {
      feedbackQuery = query(
        collection(db, "feedback"),
        where("email", "==", user.email)
      );
    }

    const snap = await getDocs(feedbackQuery);
    setFeedbacks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Feedback)));
  };

  useEffect(() => {
    fetchAll();
  }, [user]);

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
      <h2 className="text-lg font-bold mb-4">
        {isAdmin ? "All Feedback" : "Your Feedback"}
      </h2>
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
          onDelete={isAdmin ? handleDelete : undefined}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
