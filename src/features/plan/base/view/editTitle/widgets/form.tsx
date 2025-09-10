import { TextField } from "@/components/form";

export default function EditTitleForm() {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        name="title"
        label="企画名"
        placeholder="企画名を入力してください"
      />
    </div>
  );
}
