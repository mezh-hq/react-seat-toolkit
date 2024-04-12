import { memo, useCallback, useState } from "react";
import { Image } from "lucide-react";
import { v4 as uuidV4 } from "uuid";
import { store } from "@/store";
import { addImage, hideControls } from "@/store/reducers/editor";
import { selectTool } from "@/store/reducers/toolbar";
import { getImageDimensions, getWorkspaceCenterX, getWorkspaceCenterY, toBase64 } from "@/utils";
import { Button } from "../core";
import { Tool } from "../toolbar/data";

const onUploadClick = () => document.getElementById("image-input").click();

const ImageControls = () => {
  const [file, setFile] = useState(null);

  const onUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 1024000) {
      alert("Image size should be less than 1MB");
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
    <div className="w-full h-full flex flex-col justify-between gap-5">
      <div
        className="h-full w-full flex justify-center items-center rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-medium"
        onClick={onUploadClick}
      >
        {file ? <img src={file} alt="uploaded image" className="h-full w-full" /> : <Image size={30} />}
      </div>
      <Button className="py-2.5" onClick={onAddToWorkspace} disabled={!file}>
        Add to Workspace
      </Button>
      <input id="image-input" type="file" accept="image/*" className="hidden" onInput={onUpload} />
    </div>
  );
};

export default memo(ImageControls);
