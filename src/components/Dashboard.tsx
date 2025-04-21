import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Feedback } from "../types/feedback";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingId, setReplyingId] = useState<string | null>(null);

  const fetchAll = async () => {
    const snap = await getDocs(collection(db, "feedback"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Feedback));
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const shown = feedbacks.filter(
    (f) =>
      f.name.includes(filter) ||
      f.comment.includes(filter) ||
      (f.reply?.includes(filter) ?? false)
  );

  const avg = shown.length
    ? shown.reduce((sum, f) => sum + f.rating, 0) / shown.length
    : 0;

  const counts = [1, 2, 3, 4, 5].map(
    (n) => shown.filter((f) => f.rating === n).length
  );

  const saveReply = async (id: string) => {
    if (!replyText) return;
    await updateDoc(doc(db, "feedback", id), {
      reply: replyText,
      replyDate: new Date().toISOString(),
    });
    setReplyingId(null);
    setReplyText("");
    fetchAll();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search feedback…"
        className="mb-4 p-2 border rounded w-full"
      />

      <p>Total Shown: {shown.length}</p>
      <p>Average Rating: {avg.toFixed(1)}★</p>

      <div className="mt-4 w-full max-w-lg">
        <Bar
          data={{
            labels: ["1★", "2★", "3★", "4★", "5★"],
            datasets: [
              {
                label: "Count",
                data: counts,
                backgroundColor: "rgba(59,130,246,0.7)",
              },
            ],
          }}
        />
      </div>

      <div className="mt-6 space-y-4">
        {shown.map((fb) => (
          <div
            key={fb.id}
            className="border p-4 rounded bg-white dark:bg-gray-700"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{fb.name}</span>
              <span>{fb.rating}★</span>
            </div>
            <p className="mt-1">{fb.comment}</p>
            <small className="text-gray-500 block mb-2">
              Submitted: {new Date(fb.date).toLocaleString()}
            </small>

            {fb.reply && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="italic">Admin Reply: {fb.reply}</p>
                <small className="text-gray-500">
                  at {new Date(fb.replyDate!).toLocaleString()}
                </small>
              </div>
            )}

            {!fb.reply && replyingId !== fb.id && (
              <button
                onClick={() => setReplyingId(fb.id!)}
                className="mt-2 text-blue-600 underline"
              >
                Reply
              </button>
            )}

            {replyingId === fb.id && (
              <div className="mt-2 space-y-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply…"
                  className="w-full p-2 border rounded"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveReply(fb.id!)}
                    className="px-4 py-1 bg-green-500 text-white rounded"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => setReplyingId(null)}
                    className="px-4 py-1 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
