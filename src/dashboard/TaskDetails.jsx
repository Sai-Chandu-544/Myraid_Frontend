import { ArrowLeft, Calendar, FileText, Sparkles } from "lucide-react";

const statusStyles = {
  pending: {
    pill: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-500"
  },
  "in-progress": {
    pill: "bg-orange-50 text-orange-600 border-orange-100",
    dot: "bg-orange-500"
  },
  completed: {
    pill: "bg-green-50 text-green-600 border-green-100",
    dot: "bg-green-500"
  }
};
  
export const TaskDetails = ({ task, onClose }) => {

const style = statusStyles[task.status] || statusStyles.pending;
  

  return (
   <div className="w-[370px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(30,41,59,0.12)] flex flex-col max-h-[90vh] overflow-hidden">

  {/* Header */}
  <div className="px-6 pt-6 pb-5 border-b border-slate-100">

    {/* Top bar */}
    <div className="flex items-center justify-between mb-5">

      <button
        onClick={onClose}
        className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back
      </button>

      {/* Status badge */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold ${style.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {task.status}
      </span>

    </div>

    {/* Title */}
    <h1 className="text-[19px] font-extrabold text-slate-900 leading-snug break-words line-clamp-3 mb-3">
      {task.title}
    </h1>

    {/* Created date */}
    <div className="flex items-center gap-1.5 text-slate-400 text-[12.5px]">
      <Calendar size={12} strokeWidth={2} />
      Created {task.date}
    </div>

  </div>

  {/* Content */}
  <div className="flex-1 overflow-y-auto px-6 py-5">

    {/* Description label */}
    <div className="flex items-center gap-2 mb-3">
      <FileText size={13} strokeWidth={2} className="text-slate-400" />

      <span className="text-[11px] font-bold text-slate-400 tracking-[0.13em] uppercase">
        Description
      </span>
    </div>

    {/* Description body */}
    {task.description ? (

      <p className="text-[13.5px] text-slate-600 leading-relaxed break-words whitespace-pre-wrap">
        {task.description}
      </p>

    ) : (

      <div className="flex flex-col items-center justify-center py-8 text-center">

        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
          <Sparkles size={18} className="text-slate-300" strokeWidth={1.75} />
        </div>

        <p className="text-sm font-medium text-slate-400">
          No description yet
        </p>

        <p className="text-xs text-slate-300 mt-1">
          Add context to help your team.
        </p>

      </div>

    )}

  </div>

</div>
  );
};
