import React from "react";
import { Feedback } from "../types/feedback";

type Props = {
  data: Feedback;
  onEdit?: (fb: Feedback) => void;
  onDelete?: (id: string) => void;
};

const FeedbackItem = ({ data, onEdit, onDelete }: Props) => {
  const handleDelete = () => {
    if (onDelete && data.id) {
      onDelete(data.id);
    }
  };

  return (
    <div className="border p-4 mb-2 rounded bg-white dark:bg-gray-700">
      {/* ... same as above ... */}
      <div className="space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(data)}
            className="text-blue-500 underline"
          >
            Edit
          </button>
        )}
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
