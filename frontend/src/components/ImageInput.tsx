import { ImageIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function ImageInput({
  onChange,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
      />

      <Button
        className="rounded-full"
        type="button"
        onClick={handleClick}
        variant="ghost"
        size="icon-lg"
      >
        <ImageIcon />
      </Button>
    </>
  );
}