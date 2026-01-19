

function MainContentLayout({ heading, options = [], children }) {
  return (
    <main
      className="
        pt-18 lg:pl-64
        min-h-screen
        bg-zinc-300 dark:bg-black
        text-gray-900 dark:text-gray-100
      "
    >
      {/* HEADER ROW */}
      {(heading || options.length > 0) && (
        <div
          className="
            sticky top-18
            z-20
            flex items-center justify-between
            px-4 py-3
            bg-zinc-300/80 dark:bg-black/80
            backdrop-blur
            border-b border-zinc-200 dark:border-zinc-800
          "
        >
          {/* LEFT */}
          <h2 className="text-lg md:text-xl font-semibold tracking-tight">
            {heading}
          </h2>

          {/* RIGHT: OPTIONS */}
          <div className="flex items-center gap-2">
            {options.map((option, index) => (
              <span key={index}>{option}</span>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="p-4">
        {children}
      </div>
    </main>
  );
}

export default MainContentLayout;
