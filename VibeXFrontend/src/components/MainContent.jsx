
function MainContent({ children }) {
  return (
    <main
      className="
      min-h-screen
      text-gray-900 dark:text-gray-100 overflow-hidden
      bg-zinc-100 dark:bg-black
    "
    >
      {children}
    </main>
  );
}

export default MainContent;
