
function MainContent({ children }) {
  return (
    <main
      className="
      pt-12 lg:pl-64 min-h-screen
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100 overflow-hidden
    "
    >
      {children}
    </main>
  );
}

export default MainContent;
