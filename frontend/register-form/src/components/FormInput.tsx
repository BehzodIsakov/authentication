import { Info, Check, X } from "lucide-react";

interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMsg?: string;
  isTouched?: boolean;
  isValid?: boolean;
}

export default function FormInput({
  label,
  id,
  errorMsg,
  isTouched,
  isValid,
  ...inputProps
}: PropTypes) {
  return (
    <div>
      <label htmlFor={id} className='mb-0.5 flex items-center gap-1.5'>
        {label}:
        {isTouched ? (
          isValid ? (
            <Check className='inline-block text-success size-4' />
          ) : (
            <X className='inline-block text-error size-4' />
          )
        ) : null}
      </label>
      <input
        {...inputProps}
        className={`input block w-full ${errorMsg ? "input-error" : ""} ${
          inputProps.className || ""
        }`}
      />
      {errorMsg && (
        <div className='bg-neutral-800 text-neutral-300 py-1 px-2 mt-1.5 rounded-sm text-sm'>
          <Info className='size-4 inline-block mr-1' /> {errorMsg}
        </div>
      )}
    </div>
  );
}
