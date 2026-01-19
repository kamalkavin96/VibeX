
function MainContent({ children }) {
  return (
    <main
      className="
      pt-16.5 lg:pl-64 min-h-screen
      text-gray-900 dark:text-gray-100 overflow-hidden
      bg-zinc-300 dark:bg-black
    "
    >
      {children}
    </main>
  );
}

export default MainContent;
