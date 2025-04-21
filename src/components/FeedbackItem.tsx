import React from "react";
import { Feedback } from "../types/feedback";

type Props = {
  data: Feedback;
  onEdit?: (fb: Feedback) => void;
  onDelete?: (id: string) => void;
};

const FeedbackItem = ({ data, onEdit, onDelete }: Props) => {
  // create a short snippet
  const snippet =
    data.comment.length > 50 ? data.comment.slice(0, 50) + "…" : data.comment;

  // local alias for the ID
  const id = data.id;

  const handleDelete = () => {
    if (onDelete && id) {
      onDelete(id);
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

        {/* always render the button if onDelete exists,
            but only call if id is defined */}
        {onDelete && (
          <button onClick={handleDelete} className="text-red-500 underline">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackItem;
