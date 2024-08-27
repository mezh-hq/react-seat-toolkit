import { Input, Label } from "@/components/core";

interface ControlInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const ControlInput = ({ id, label, ...props }: ControlInputProps) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="col-span-2" {...props} />
    </>
  );
};

export default ControlInput;
