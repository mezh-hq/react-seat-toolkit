import { useState } from "react";
import { Copy } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useBreakpoint } from "@/hooks";
import { ISTKData } from "@/types";
import { IStyles } from "@/types/styles";
import { stateToJSON } from "@/utils";
import { Button, IconButton } from "../core";

interface IExportActionProps {
  text?: string;
  onExport?: (data: ISTKData) => unknown;
  styles?: IStyles;
}

const ExportAction: React.FC<IExportActionProps> = ({ text = "Export JSON", onExport, styles }) => {
  const [loading, setLoading] = useState(false);
  const { md } = useBreakpoint();

  const onExportJson = () => {
    const json = stateToJSON();
    if (onExport) {
      setLoading(true);
      const result = onExport(json);
      if (result instanceof Promise) {
        result.finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      console.log(json);
      sessionStorage.setItem("stk-data", JSON.stringify(json));
      navigator.clipboard.writeText(JSON.stringify(json));
    }
  };

  if (md)
    return (
      <Button
        loading={loading}
        className={twMerge(styles?.core?.button?.className)}
        style={styles?.core?.button?.properties}
        onClick={onExportJson}
        variant="secondary"
      >
        {text}
      </Button>
    );

  return (
    <IconButton
      icon={<Copy className="w-5 h-5" />}
      label={text}
      onClick={onExportJson}
      loading={loading}
      className={twMerge("w-10", styles?.core?.button?.className)}
      style={styles?.core?.button?.properties}
      variant="secondary"
    />
  );
};

export default ExportAction;
