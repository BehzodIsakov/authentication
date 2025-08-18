import { useState } from "react";
import FormInput from "./FormInput";

interface FormField {
  value: string;
  errorMsg: string;
  isValid: boolean;
  isTouched: boolean;
}

interface Form {
  name: FormField;
  email: FormField;
  password: FormField;
  confirmPassword: FormField;
}

const initialUserData: Form = {
  name: {
    value: "",
    errorMsg: "",
    isValid: false,
    isTouched: false,
  },
  email: {
    value: "",
    errorMsg: "",
    isValid: false,
    isTouched: false,
  },
  password: {
    value: "",
    errorMsg: "",
    isValid: false,
    isTouched: false,
  },
  confirmPassword: {
    value: "",
    errorMsg: "",
    isValid: false,
    isTouched: false,
  },
};

export function Register() {
  const [form, setForm] = useState<Form>(initialUserData);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isFormValid = Object.values(form).every((v) => v.isValid);
    if (!isFormValid) return;
  }

  function validateField(name: keyof Form, value: string, required: boolean) {
    if (required && !value.trim()) return "Input field is empty!";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format!";
    }

    if (name === "confirmPassword" && value !== form.password.value) {
      return "Passwords do not match!";
    }
  }

  function updateField(
    name: keyof Form,
    value: string,
    required: boolean,
    touched: boolean = false
  ) {
    setForm((prev) => {
      const errorMsg = validateField(name, value, required);
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          isValid: !errorMsg,
          isTouched: touched || prev[name].isTouched,
          errorMsg,
        },
      };
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateField(e.target.name as keyof Form, e.target.value, e.target.required);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    updateField(
      e.target.name as keyof Form,
      e.target.value,
      e.target.required,
      true
    );
  }

  return (
    <div className='grid place-items-center min-h-screen'>
      <div className='dark:bg-gray-700 w-[450px] py-8 px-6 rounded-md shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>Register</h1>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <FormInput
            name='name'
            id='name'
            label='Name'
            required
            value={form.name.value}
            errorMsg={form.name.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='email'
            id='email'
            label='Email'
            type='email'
            required
            value={form.email.value}
            errorMsg={form.email.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='password'
            id='password'
            label='Password'
            type='password'
            required
            value={form.password.value}
            errorMsg={form.password.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='confirmPassword'
            id='confirmPassword'
            label='Confirm password'
            type='password'
            required
            value={form.confirmPassword.value}
            errorMsg={form.confirmPassword.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <button className='btn btn-primary block w-full' type='submit'>
            Sign Up
          </button>
        </form>
        <div className='mt-6'>
          <div>Already registered?</div>
          <a className='link' href='#signin'>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
