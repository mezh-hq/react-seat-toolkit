import { memo, useCallback, useState } from "react";
import { Image } from "lucide-react";
import { v4 as uuidV4 } from "uuid";
import { Tool } from "@/constants";
import { store } from "@/store";
import { addImage, hideControls } from "@/store/reducers/editor";
import { selectTool } from "@/store/reducers/toolbar";
import { ISTKProps } from "@/types";
import { getImageDimensions, getWorkspaceCenterX, getWorkspaceCenterY, toBase64 } from "@/utils";
import { Button } from "../core";

const onUploadClick = () => document.getElementById("image-input").click();

type IImageControlProps = Pick<ISTKProps, "options" | "styles">;

const Controls = ({ options: { maxImageSize = 1024000 } = {} }: IImageControlProps) => {
  const [file, setFile] = useState(null);

  const onUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > maxImageSize) {
      const kb = +(maxImageSize / 1024).toFixed(0);
      window.toast.warning(`Image size should be less than ${kb > 1024 ? `${(kb / 1024).toFixed(0)} MB` : `${kb} KB`}`);
      e.target.value = "";
      return;
    }
    setFile(await toBase64(f));
  };

  const onAddToWorkspace = useCallback(async () => {
    const dimensions = await getImageDimensions(file);
    while (dimensions.height > 500) {
      dimensions.height /= 2;
      dimensions.width /= 2;
    }
    store.dispatch(
      addImage({
        id: uuidV4(),
        href: file,
        x: getWorkspaceCenterX() - dimensions.width / 2,
        y: getWorkspaceCenterY() * 0.75 - dimensions.height / 2,
        width: dimensions.width,
        height: dimensions.height
      })
    );
    store.dispatch(hideControls());
    store.dispatch(selectTool(Tool.Select));
  }, [file]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div
        className="w-full aspect-square flex justify-center items-center rounded-md overflow-clip cursor-pointer bg-slate-100 border border-gray-200"
        onClick={onUploadClick}
      >
        {file ? (
          <img src={file} alt="uploaded image" className="h-full w-full object-cover" />
        ) : (
          <Image size={24} className="text-slate-500" />
        )}
      </div>
      <Button className="py-2.5" variant="secondary" onClick={onAddToWorkspace} disabled={!file}>
        Add to Workspace
      </Button>
      <input id="image-input" type="file" accept="image/*" className="hidden" onInput={onUpload} />
    </div>
  );
};

const ImageControls = memo(Controls);

(ImageControls as any).name = "ImageControls";

export default ImageControls;
