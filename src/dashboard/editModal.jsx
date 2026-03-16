import { useState } from "react";
import { ChevronDown, X, Send } from "lucide-react";
import { updateTask } from "../Api/ApiRequests";
import toast from "react-hot-toast";

const statusOptions = ["pending", "in-progress", "completed"];

export const EditTaskModal = ({ task, onClose, onUpdate }) => {

  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    dueDate: task.dueDate || ""
  });

  const [statusOpen, setStatusOpen] = useState(false);

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await updateTask(task.id, form);

      toast.success("Task updated successfully");

      // update dashboard state
      onUpdate({
        ...task,
        ...form
      });

      onClose();

    } catch (error) {

      console.error(error);
      toast.error("Failed to update task");

    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-[95%] sm:w-[500px] md:w-[560px] max-h-[85vh] overflow-y-auto p-6 sm:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-[20px] font-bold text-slate-900">
            Edit Task
          </h1>

          <p className="text-slate-400 text-[13px]">
            Update task details
          </p>
        </div>

        <button onClick={onClose}>
          <X size={18} />
        </button>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Task Title
          </label>

          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 min-h-[90px]"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Status
          </label>

          <div className="relative">

            <button
              type="button"
              onClick={() => setStatusOpen(!statusOpen)}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg border border-slate-200"
            >
              {form.status}

              <ChevronDown
                size={16}
                className={`${statusOpen ? "rotate-180" : ""}`}
              />

            </button>

            {statusOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-20">

                {statusOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => {
                      handleChange("status", opt);
                      setStatusOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50"
                  >
                    {opt}
                  </button>
                ))}

              </div>
            )}

          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Due Date
          </label>

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-100">

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg"
          >
            Update Task
            <Send size={14} />
          </button>

        </div>

      </form>

    </div>
  );
};