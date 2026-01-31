import { useNavigate } from "react-router-dom";

export default function WelcomeSignIn() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-primary-start/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[40%] bg-primary-end/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto px-6 py-8 relative z-10">
        {/* Logo + heading */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-hackviolet rounded-2xl flex items-center justify-center shadow-lg shadow-primary-start/20 mb-6">
            <span className="material-symbols-outlined text-white text-4xl">spa</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-center text-dark-gray mb-3">
            Welcome back
          </h1>
          <p className="text-gray-500 text-base font-normal text-center max-w-[280px] leading-relaxed">
            Ready to prepare for your next visit? Your personal health journal is ready.
          </p>
        </div>

        {/* Sign-in form */}
        <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-dark-gray text-sm font-semibold ml-1">Email</label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-gray-200 bg-white focus:border-primary-start focus:ring-2 focus:ring-primary-start/20 h-14 pl-12 pr-4 text-dark-gray placeholder:text-gray-400 text-base font-normal transition-all duration-200"
                placeholder="name@example.com"
                type="email"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                mail
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-dark-gray text-sm font-semibold ml-1">Password</label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-gray-200 bg-white focus:border-primary-start focus:ring-2 focus:ring-primary-start/20 h-14 pl-12 pr-4 text-dark-gray placeholder:text-gray-400 text-base font-normal transition-all duration-200"
                placeholder="••••••••"
                type="password"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                lock
              </span>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-gray transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <a className="text-sm font-bold text-hackviolet" href="#">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button
              className="flex items-center justify-center w-full h-14 bg-hackviolet active:scale-[0.98] text-white text-lg font-bold rounded-2xl transition-all duration-200 shadow-xl shadow-primary-start/25"
              type="button"
              onClick={() => navigate("/journal")}
            >
              Sign In
            </button>
            <button className="flex items-center justify-center gap-2 w-full h-14 bg-white border border-gray-200 hover:bg-gray-50 active:scale-[0.98] text-dark-gray text-base font-semibold rounded-2xl transition-all duration-200">
              <span className="material-symbols-outlined text-[22px] text-gray-600">face</span>
              Sign in with Face ID
            </button>
          </div>
        </form>

        {/* Encryption badge */}
        <div className="flex items-center justify-center gap-2 mt-8 py-2 px-4 bg-gray-100/50 rounded-full self-center">
          <span className="material-symbols-outlined text-primary-start text-lg">verified_user</span>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
            Encrypted &amp; Private
          </p>
        </div>

        {/* Create account link */}
        <div className="mt-auto pt-10 pb-4 text-center">
          <p className="text-gray-500 text-sm font-medium">
            New here?{" "}
            <a
              className="font-bold text-hackviolet decoration-2 underline-offset-4 hover:underline"
              href="#"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>

      <div className="h-1.5 w-full bg-hackviolet opacity-10" />
    </div>
  );
}
