import { LoginFactory } from "@presenters/login.factory";
import { useLoginPresenter } from "@presenters/useLoginPresenter";

export const Login = () => {
  const { onLogin, email, password, setEmail, setPassword } = useLoginPresenter(
    LoginFactory.provideLoginCases()
  );

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur rounded-2xl shadow-lg p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-200">
          Login
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white/10 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/10 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={onLogin}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
