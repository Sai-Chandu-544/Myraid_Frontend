import Designer from "../assets/Designer.png"
import {
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";




// ── Feature Card
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
      <Icon size={20} className="text-blue-600" strokeWidth={1.75} />
    </div>
    <h3 className="text-[15px] font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export const TaskMasterLanding=()=> {
  return (
   <div className="min-h-screen bg-[#f0f2f5] font-sans">
 

  {/* HERO SECTION */}
  <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-16 sm:pb-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

    {/* LEFT */}
    <div>

      {/* Headline */}
      <h1 className="text-[34px] sm:text-[38px] md:text-[42px] font-extrabold text-slate-900 leading-[1.2] mb-5">
        Master your
        <br />
        productivity,{" "}
        <span className="text-blue-600">
          one <br className="hidden sm:block" />
          task at a time
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-[420px]">
        The all-in-one workspace for your tasks, projects, and teams.
        Stay organized, collaborate seamlessly, and hit your deadlines
        with ease.
      </p>

      {/* Button */}
      <div className="flex items-center gap-3 mb-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-[11px] rounded-lg transition-colors">
          Get Started Free
        </button>
      </div>

      {/* Users */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-400 font-medium">
          Joined by{" "}
          <span className="text-slate-600 font-semibold">10k+</span>{" "}
          professionals this month
        </span>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_40px_rgba(30,41,59,0.08)] overflow-hidden w-full max-w-[380px] md:max-w-[420px]">
        <img
          src={Designer}
          alt="TaskMaster App Preview"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>

  <section className="py-2 bg-white">

  </section>

  {/* FEATURES SECTION */}
  <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-20 sm:pb-24">

    {/* Heading */}
    <div className="text-center mb-10 sm:mb-12">
      <h2 className="text-[22px] sm:text-[24px] md:text-[26px] font-bold text-slate-900 mb-3">
        Streamline your workflow
      </h2>

      <p className="text-slate-400 text-sm max-w-[420px] mx-auto leading-relaxed">
        Powerful features designed to help you and your team perform at
        your best, no matter where you are.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      <FeatureCard
        icon={ShieldCheck}
        title="Enterprise Security"
        desc="Your data is protected with bank-grade encryption, two-factor authentication, and advanced permission controls."
      />

      <FeatureCard
        icon={Users}
        title="Seamless Teamwork"
        desc="Collaborate in real-time, assign tasks, and share feedback instantly with your entire team in shared workspaces."
      />

      <FeatureCard
        icon={RefreshCw}
        title="Cross-platform Sync"
        desc="Stay productive on the go with seamless synchronization across web, macOS, Windows, iOS, and Android devices."
      />

    </div>
  </section>
</div>
  );
}