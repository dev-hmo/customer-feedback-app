import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "feedback"));
      setFeedbacks(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Feedback))
      );
    })();
  }, []);

  const avg = feedbacks.length
    ? feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length
    : 0;

  const counts = [1, 2, 3, 4, 5].map(
    (st) => feedbacks.filter((f) => f.rating === st).length
  );

  const data = {
    labels: ["1★", "2★", "3★", "4★", "5★"],
    datasets: [
      { label: "Count", data: counts, backgroundColor: "rgba(59,130,246,0.7)" },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Total Feedback: {feedbacks.length}</p>
      <p>Average Rating: {avg.toFixed(1)}★</p>
      <div className="mt-6">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
