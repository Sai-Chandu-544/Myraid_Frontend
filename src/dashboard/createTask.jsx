import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import toast from "react-hot-toast";
import { createTask } from "../Api/ApiRequests";
import { useTaskContext  } from "../context/context";

const statusOptions = ["pending", "in-progress", "completed"];

export const CreateNewTask = () => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: ""
  });

  const [statusOpen, setStatusOpen] = useState(false);

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };
  const {setOpen}=useTaskContext()

  const handleCreateTask = async () => {
    try {

      if (!form.title) {
        toast.error("Task title is required");
        return;
      }

      const res = await createTask(form);

      toast.success("Task created successfully");
      setOpen(false)

      setForm({
        title: "",
        description: "",
        status: "pending",
        dueDate: ""
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-[95%] sm:w-[500px] md:w-[560px] max-h-[85vh] overflow-y-auto p-6 sm:p-8 font-sans">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[20px] sm:text-[22px] font-bold text-slate-900 mb-1">
          Create New Task
        </h1>

        <p className="text-slate-400 text-[13px]">
          Organize your workflow by providing task details.
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Task Title
          </label>

          <input
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-[14px] outline-none focus:border-blue-400"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Provide more context..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-[14px] min-h-[90px]"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Status
          </label>

          <div className="relative">
            <button
              onClick={() => setStatusOpen(!statusOpen)}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg border border-slate-200 text-[14px]"
            >
              {form.status}
              <ChevronDown
                size={16}
                className={`${statusOpen ? "rotate-180" : ""} transition-transform`}
              />
            </button>

            {statusOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                {statusOptions.map((opt) => (
                  <button
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

        {/* DATE */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
            Due Date
          </label>

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-[14px]"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={handleCreateTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg"
          >
            Create Task
            <Send size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};