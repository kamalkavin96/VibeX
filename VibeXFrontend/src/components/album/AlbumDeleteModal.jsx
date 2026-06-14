export default function AlbumDeleteModal({ albumTitle, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl p-6">
        <h3 className="text-xl font-semibold">Delete Album '{albumTitle}'</h3>

        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-xl bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
