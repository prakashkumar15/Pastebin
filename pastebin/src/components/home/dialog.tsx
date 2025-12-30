interface PasteDialogProps {
  showDialog: boolean;
  pasteUrl: string;
  onClose: () => void;
  onCopyToClipboard: () => void;
}

export default function PasteDialog({
  showDialog,
  pasteUrl,
  onClose,
  onCopyToClipboard,
}: PasteDialogProps) {
  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Paste saved!</h2>
        <p className="text-sm text-gray-600">Your paste is ready to share:</p>
        <div className="bg-gray-100 p-3 rounded border border-gray-300 break-all">
          <a
            href={pasteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-mono"
          >
            {pasteUrl}
          </a>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCopyToClipboard}
            className="flex-1 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Copy URL
          </button>
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
