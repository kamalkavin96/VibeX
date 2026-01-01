function LoginPage() {
  const oauthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <main
      className="
      min-h-screen flex items-center justify-center pt-12
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100
    "
    >
      <div
        className="
        w-full max-w-md
        rounded-2xl py-8 px-8
        bg-white dark:bg-zinc-900
        shadow-xl
        border border-gray-200 dark:border-zinc-800
      "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Login to VibeX 🎶
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Continue your music journey
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          {/* Google */}
          <button
            onClick={() => oauthLogin("google")}
            className="
              w-full h-11 rounded-lg
              flex items-center justify-center gap-3
              border border-gray-300 dark:border-zinc-700
              hover:bg-gray-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          {/* Microsoft */}
          <button
            disabled
            onClick={() => oauthLogin("microsoft")}
            className="
              w-full h-11 rounded-lg
              flex items-center justify-center gap-3
              border border-gray-300 dark:border-zinc-700
              hover:bg-gray-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              className="h-5"
            />
            <span className="text-sm font-medium">Continue with Microsoft</span>
          </button>

          {/* Facebook */}
          <button
            disabled
            onClick={() => oauthLogin("facebook")}
            className="
              w-full h-11 rounded-lg
              flex items-center justify-center gap-3
              border border-gray-300 dark:border-zinc-700
              hover:bg-gray-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">Continue with Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
