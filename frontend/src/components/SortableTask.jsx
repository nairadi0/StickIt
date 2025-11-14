import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableTicket({ task, editingTaskId, handleStartEdit, handleDeleteTask, handleUpdateTask, handleCancelEdit, editingText, setEditingText }) {
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, 
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, 
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task-ticket">
      {editingTaskId === task._id ? (

        <div className="task-edit">
          <textarea
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <div className="task-actions">
            <button onClick={() => handleUpdateTask(task._id)} className="save-button">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-ticket-content">
            <p>{task.text}</p>
            <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
          </div>
          <div className="task-actions">
            <button onClick={() => handleStartEdit(task)}>
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SortableTicket;