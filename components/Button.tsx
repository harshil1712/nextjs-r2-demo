import type { FormEventHandler } from "react";

interface ButtonProps {
  text: string;
  submitHandler: FormEventHandler;
}

export default function Button({ text, submitHandler }: ButtonProps) {
  return (
    <button
      type="submit"
      className="mt-4 px-6 py-4 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
      onClick={(e) => submitHandler(e)}
    >
      {text}
    </button>
  );
}
