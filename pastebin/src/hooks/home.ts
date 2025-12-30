import { useState } from "react";
import { createPaste } from "../query/home";

type Alert = {
  type: "error" | "success";
  message: string;
} | null;

export function useHome() {
  const [text, setText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [pasteUrl, setPasteUrl] = useState("");
  const [alert, setAlert] = useState<Alert>(null);

  const savePaste = async () => {
    if (!text.trim()) {
      setAlert({
        type: "error",
        message: "Please enter some content before saving!",
      });
      return;
    }

    try {
      const data = await createPaste({
        content: text,
        ttl_seconds: 60,
        max_views: 5,
      });

      if (data.url) {
        setPasteUrl(data.url);
        setShowDialog(true);
      } else {
        setAlert({
          type: "error",
          message: "Error: Could not generate paste URL",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message:
          "Error saving paste: " +
          (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pasteUrl);
  };

  return {
    text,
    setText,
    showDialog,
    setShowDialog,
    pasteUrl,
    setPasteUrl,
    alert,
    setAlert,
    savePaste,
    copyToClipboard,
  };
}
