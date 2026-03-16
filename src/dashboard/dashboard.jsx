import { useState, useEffect } from "react";
import {

  Plus,
  LayoutList,
  Clock,
  CheckCircle2,
  Calendar,
  Eye,
  Pencil,
  Trash2,

} from "lucide-react";
import { CreateNewTask } from "./createTask";
import { useTaskContext } from "../context/context";
import { getTasks,deleteTask } from "../Api/ApiRequests";
import { EditTaskModal } from "../dashboard/editModal";
import { useNavigate } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import toast from "react-hot-toast";




// Stat Card
const StatCard = ({ icon: Icon, iconBg, iconColor, label, count }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex-1">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
      <Icon size={20} className={iconColor} strokeWidth={1.75} />
    </div>

    <p className="text-slate-500 text-sm mb-1">{label}</p>

    <p className="text-slate-900 font-bold text-2xl leading-none">
      {count} <span className="text-slate-400 text-sm font-normal">tasks</span>
    </p>
  </div>
);

// Task Row


const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
  "Done":        "bg-green-50 text-green-600 border-green-100",
  "To Do":       "bg-amber-50 text-amber-600 border-amber-100",
  "Blocked":     "bg-red-50 text-red-500 border-red-100",
};

const TaskRow = ({ title, date, status, onView, onEdit, onDelete }) => (
  <div className="group flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200">

    {/* Left accent bar */}
    <div className={`w-1 h-10 rounded-full flex-shrink-0 ${
      status === "Done"        ? "bg-green-400" :
      status === "In Progress" ? "bg-blue-500"  :
      status === "Blocked"     ? "bg-red-400"   :
                                 "bg-amber-400"
    }`} />

    {/* Task Info */}
    <div className="flex-1 min-w-0">
      <p className={`text-[14px] font-semibold truncate mb-1.5 ${
        status === "Done" ? "line-through text-slate-400" : "text-slate-800"
      }`}>
        {title}
      </p>

      <div className="flex items-center gap-3">
        {/* Date chip */}
        <span className="flex items-center gap-1 text-[11.5px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          <Calendar size={11} strokeWidth={2} />
          {date}
        </span>

        {/* Status badge */}
        <span className={`flex items-center gap-1 text-[11.5px] font-medium px-2 py-0.5 rounded-md border ${statusStyles[status] ?? "bg-slate-50 text-slate-500 border-slate-100"}`}>
          <Clock size={11} strokeWidth={2} />
          {status}
        </span>
      </div>
    </div>

    {/* Action Buttons — visible on hover */}
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={onView}
        title="View"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all"
      >
        <Eye size={15} strokeWidth={2} />
      </button>

      <button
        onClick={onEdit}
        title="Edit"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
      >
        <Pencil size={15} strokeWidth={2} />
      </button>

      <button
        onClick={onDelete}
        title="Delete"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
      >
        <Trash2 size={15} strokeWidth={2} />
      </button>
    </div>

  </div>
);

export const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);

const [totalPages, setTotalPages] = useState(1);
const [counts, setCounts] = useState({
  pending: 0,
  progress: 0,
  done: 0
});

  const todoCount = tasks.filter(task => task.status === "pending").length;

const progressCount = tasks.filter(
  task => task.status === "in-progress"
).length;

const doneCount = tasks.filter(
  task => task.status === "completed"
).length;

  const { open, setOpen } = useTaskContext();

  const handleOpen = () => setOpen(prev => !prev);
  
  const navigate = useNavigate();

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const deleteTaskHandler = async (id) => {

  try {

    await deleteTask(id);

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

    toast.success("Task deleted successfully");

  } catch (error) {

    console.error(error);
    toast.error("Failed to delete task");

  }

};

const editTaskHandler = (task) => {
  setEditTask(task);
};

const updateTask = (updatedTask) => {

  setTasks((prev) =>
    prev.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    )
  );

};
useEffect(() => {

  const fetchTasks = async () => {

    try {

      const res = await getTasks(page);

      const formattedTasks = res.tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        date: new Date(task.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      }));

      setTasks(formattedTasks);

    
      setTotalPages(res.totalPages);

      if (page === 1) {

        const pending = res.tasks.filter(t => t.status === "pending").length;
        const progress = res.tasks.filter(t => t.status === "in-progress").length;
        const done = res.tasks.filter(t => t.status === "completed").length;

        setCounts({
          pending,
          progress,
          done
        });

      }

    } catch (err) {
      console.error(err);
    }

  };

  fetchTasks();

}, [page]);
 
  return (
    <>
      <div className="flex h-screen bg-[#f0f2f5] font-sans overflow-hidden">

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">

         

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

              <div>
                <h1 className="text-[22px] md:text-[24px] font-bold text-slate-900">
                  Dashboard Overview
                </h1>

                <p className="text-slate-400 text-sm">
                  Welcome back! Here's what's happening today.
                </p>
              </div>

              <button
                onClick={handleOpen}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-[9px] rounded-lg w-fit"
              >
                <Plus size={16} />
                New Task
              </button>

            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

              <StatCard
  icon={LayoutList}
  iconBg="bg-amber-50"
  iconColor="text-amber-500"
  label="To Do"
 count={counts.pending}

/>

<StatCard
  icon={Clock}
  iconBg="bg-blue-50"
  iconColor="text-blue-400"
  label="In Progress"
 count={counts.progress}

/>

<StatCard
  icon={CheckCircle2}
  iconBg="bg-green-50"
  iconColor="text-green-500"
  label="Done"
  count={counts.done}
/>
            </div>

            {/* TASK LIST */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 md:px-6 py-5">

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16px] font-bold text-slate-800">My Tasks</h2>
                <button className="text-sm font-semibold text-blue-600">
                  View All
                </button>
              </div>

              <div>
        {tasks.map((task) => (
  <TaskRow
    key={task.id}
    {...task}
    onView={() => setSelectedTask(task)}
    onEdit={() => editTaskHandler(task)}
    onDelete={() => deleteTaskHandler(task.id)}
  />
))}
<div className="flex justify-center items-center gap-4 mt-6">

 <button
  disabled={page <= 1}
  onClick={() => setPage((p) => p - 1)}
  className="px-3 py-1 border rounded-md disabled:opacity-40"
>
  Prev
</button>

<span className="text-sm text-gray-500">
  Page {page} of {totalPages}
</span>

<button
  disabled={page >= totalPages}
  onClick={() => setPage((p) => p + 1)}
  className="px-3 py-1 border rounded-md disabled:opacity-40"
>
  Next
</button>

</div>
              </div>

            </div>

          </main>
        </div>
        
      </div>

     {open && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onClick={() => setOpen(false)}
  >
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <CreateNewTask />
    </div>
  </div>
)}

{editTask && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onClick={() => setEditTask(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
    >
      <EditTaskModal
        task={editTask}
        onClose={() => setEditTask(null)}
        onUpdate={updateTask}
      />
    </div>
  </div>
)}

{selectedTask && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onClick={() => setSelectedTask(null)}
  >
    <div onClick={(e) => e.stopPropagation()}>
      <TaskDetails
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  </div>
)}
    </>
  );
};