import { LayoutGrid } from "lucide-react";

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-[10px] rounded-xl text-sm font-medium transition-colors ${
      active
        ? "bg-blue-50 text-blue-600"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }`}
  >
    <Icon size={17} strokeWidth={1.75} />
    {label}
  </button>
);

export const Sidebar = ({
  activeNav,
  setActiveNav,
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navItems = [
    { icon: LayoutGrid, label: "Dashboard" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-[220px] bg-white border-r border-slate-100 flex flex-col py-5 px-3 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        {/* Brand */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <LayoutGrid size={18} className="text-white" />
          </div>

          <div>
            <p className="text-[13px] font-bold text-slate-800">
              TaskMaster
            </p>
            <p className="text-[10px] text-slate-400">
              Management Suite
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ icon, label }) => (
            <NavItem
              key={label}
              icon={icon}
              label={label}
              active={activeNav === label}
              onClick={() => {
                setActiveNav(label);
                setSidebarOpen(false);
              }}
            />
          ))}
        </nav>

      </aside>
    </>
  );
};