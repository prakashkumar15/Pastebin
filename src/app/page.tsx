"use client";
import { useHome } from "../hooks/home";
import TextInput from "../components/home/text";
import Alert from "../components/home/alert";
import PasteDialog from "../components/home/dialog";
import Navbar from "../components/shared/navbar";

export default function Front() {
  const {
    text,
    setText,
    showDialog,
    setShowDialog,
    pasteUrl,
    alert,
    setAlert,
    savePaste,
    copyToClipboard,
  } = useHome();

  return (
    <div>
      <Navbar title="Pastebin" />
      <div className="mx-auto max-w-3xl p-4 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Paste your text
        </label>
        <main>
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSave={savePaste}
          />
        </main>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <PasteDialog
          showDialog={showDialog}
          pasteUrl={pasteUrl}
          onClose={() => setShowDialog(false)}
          onCopyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
}
