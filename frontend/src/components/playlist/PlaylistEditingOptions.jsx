function PlaylistEditingOptions({ onClose, onEdit, onDelete }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 text-white rounded shadow-md z-50">
      <ul className="divide-y divide-gray-700">
        <li
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
        >
          Edit
        </li>
        <li
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-red-400 hover:text-red-600"
        >
          Delete
        </li>
      </ul>
    </div>
  );
}

export default PlaylistEditingOptions;
