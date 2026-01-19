import MainContentLayout from "../layouts/MainContentLayout";

function TestPage() {
  return (
    <MainContentLayout
      heading="Songs"
      options={[
        <button 
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white"
            onClick={()=>alert("Clicked")}
        >
          Add Song
        </button>,
        <button className="px-3 py-1.5 rounded-lg border dark:border-zinc-700">
          Filter
        </button>,
      ]}
    >
      {/* page content */}
      <p>Hello</p>
    </MainContentLayout>
  );
}

export default TestPage;
