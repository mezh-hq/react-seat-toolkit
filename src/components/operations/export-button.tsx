import { useState } from "react";
import { Copy } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ISTKData } from "@/types";
import { IStyles } from "@/types/styles";
import { stateToJSON } from "@/utils";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../core";

interface IExportActionProps {
  text?: string;
  onExport?: (data: ISTKData) => unknown;
  styles?: IStyles;
}

const ExportAction: React.FC<IExportActionProps> = ({ text = "Export JSON", onExport, styles }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          loading={loading}
          className={twMerge("w-10 md:w-auto px-2 md:px-4 transition-none", styles?.core?.button?.className)}
          style={styles?.core?.button?.properties}
          onClick={onExportJson}
          variant="secondary"
        >
          <Copy className="w-5 h-5 md:hidden" /> <span className="hidden md:block">{text}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:hidden">{text}</TooltipContent>
    </Tooltip>
  );
};

export default ExportAction;
