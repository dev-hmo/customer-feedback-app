import React from "react";
import { Feedback } from "../types/feedback";

type Props = {
  data: Feedback;
  onEdit?: (fb: Feedback) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
};

const FeedbackItem = ({ data, onEdit, onDelete, isAdmin }: Props) => {
  const snippet =
    data.comment.length > 50 ? data.comment.slice(0, 50) + "…" : data.comment;

  const handleDelete = () => {
    if (onDelete && data.id) {
      onDelete(data.id);
    }
  };

  return (
    <div className="border p-4 mb-2 rounded bg-white dark:bg-gray-700">
      <div className="flex justify-between">
        <h4 className="font-semibold">{data.name}</h4>
        <span>{data.rating}★</span>
      </div>

      <p className="mt-1">{snippet}</p>

      <small className="block text-gray-500 mb-2">
        {new Date(data.date).toLocaleString()}
      </small>

      <div className="space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(data)}
            className="text-blue-500 underline"
          >
            Edit
          </button>
        )}
        {isAdmin && onDelete && (
          <button onClick={handleDelete} className="text-red-500 underline">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackItem;
