interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMsg?: string;
}

export default function FormInput({
  label,
  errorMsg,
  ...inputProps
}: PropTypes) {
  <div>
    <label htmlFor={label} className='mb-0.5 inline-block'>
      {label}
    </label>
    <input
      {...inputProps}
      className={`input block w-full ${errorMsg ? "input-error" : ""} ${
        inputProps.className || ""
      }`}
    />
    {errorMsg && (
      <div className='text-sm italic text-error mt-1'>{errorMsg}</div>
    )}
  </div>;
}
