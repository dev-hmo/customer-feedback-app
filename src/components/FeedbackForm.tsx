import React, { useState, useEffect } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Feedback } from "../types/feedback";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  editData?: Feedback | null;
  onUpdate?: () => void;
};

const FeedbackForm = ({ editData, onUpdate }: Props) => {
  const { user } = useAuth();
  const nav = useNavigate();
  const isEdit = Boolean(editData);

  const [form, setForm] = useState<Feedback>(
    editData ?? { name: "", email: "", rating: 0, comment: "", date: "" }
  );

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return nav("/login");

    const payload = {
      name: form.name,
      comment: form.comment,
      rating: form.rating,
      date: new Date().toISOString(),
      email: user.email!,
    };

    if (isEdit && form.id) {
      await updateDoc(doc(db, "feedback", form.id), payload);
    } else {
      await addDoc(collection(db, "feedback"), payload);
    }

    setForm({ name: "", email: "", rating: 0, comment: "", date: "" });
    onUpdate?.();
  };

  if (!user) {
    return (
      <div className="p-4">
        <p>
          Please{" "}
          <button onClick={() => nav("/login")} className="underline">
            login
          </button>{" "}
          to submit feedback.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-900 rounded space-y-3"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="rating"
        value={form.rating}
        onChange={handleChange}
        min={1}
        max={5}
        required
        placeholder="Rating (1-5)"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        required
        placeholder="Your Feedback"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEdit ? "Update Feedback" : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
