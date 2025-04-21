import React, { useState, useEffect } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Feedback } from "../types/feedback";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThankYou from "./ThankYou";

type Props = {
  editData?: Feedback | null;
  onUpdate?: () => void;
};

const FeedbackForm = ({ editData, onUpdate }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(editData);

  // form fields
  const [form, setForm] = useState<Feedback>(
    editData ?? {
      id: undefined,
      name: "",
      rating: 0,
      comment: "",
      date: "",
      email: "",
    }
  );
  // whether we just submitted
  const [submitted, setSubmitted] = useState(false);

  // if editData changes, preload
  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    const payload = {
      name: form.name,
      comment: form.comment,
      rating: form.rating,
      date: new Date().toISOString(),
      email: user.email!,
    };

    try {
      if (isEdit && form.id) {
        await updateDoc(doc(db, "feedback", form.id), payload);
      } else {
        await addDoc(collection(db, "feedback"), payload);
      }
    } catch (err) {
      console.error("Failed to write feedback:", err);
      return;
    }

    // flip to thank-you screen
    setSubmitted(true);
    onUpdate?.();
  };

  // 1) If we've just submitted, show the ThankYou component
  if (submitted) {
    return <ThankYou />;
  }

  // 2) If not logged in, prompt to login (won't hit ThankYou)
  if (!user) {
    return (
      <div className="p-4">
        <p>
          Please{" "}
          <button onClick={() => navigate("/login")} className="underline">
            login
          </button>{" "}
          to submit feedback.
        </p>
      </div>
    );
  }

  // 3) Otherwise, render the form
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded space-y-4"
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
        placeholder="Rating (1-5)"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Your Feedback"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {isEdit ? "Update Feedback" : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
