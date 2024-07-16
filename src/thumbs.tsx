type WidthHeight = {width: number; height: number}

const getWH = (original: WidthHeight): WidthHeight => {
  const ratio = Math.min(300 / original.width, 300 / original.height);
  if (ratio >= 1) return original;

  return {
    width: Math.round(original.width * ratio),
    height: Math.round(original.height * ratio),
  };
};

export const getImageThumbnail = (file: File): Promise<File> => {
  const reader = new FileReader();
  const image = new Image();

  return new Promise((response, err) => {
    if (!file.type.match(/image.*/)) {
      err(new Error("Not an image"));
      return;
    }

    reader.onload = (readerEvent) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");

        const { width, height } = getWH({
          width: image.width,
          height: image.height,
        });
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        canvas.getContext("2d")!.drawImage(image, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob) => {
            if (!blob) return err(new Error("Error creating thumbnail"));
            response(
              new File([blob as Blob], "thumbnail.png", {
                type: blob.type,
              })
            );
          },
          "image/webp",
          0.75 /* quality */
        );
      };
      image.src = readerEvent?.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
