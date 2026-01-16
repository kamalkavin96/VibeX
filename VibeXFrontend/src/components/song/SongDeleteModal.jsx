const SongDeleteModal = ({ songName, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      
      <div className="
        w-full max-w-lg rounded-2xl p-6
        bg-white dark:bg-zinc-900
        text-gray-900 dark:text-gray-100
      ">
        <h3 className="text-xl font-semibold mb-2">
          Delete Playlist '{songName}'
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              bg-gray-200 hover:bg-gray-300
              dark:bg-zinc-800 dark:hover:bg-zinc-700
            "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="
              px-4 py-2 rounded-lg
              bg-red-600 hover:bg-red-700
              text-white
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongDeleteModal;
