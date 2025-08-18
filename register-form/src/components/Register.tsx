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
  const [user, setUser] = useState<Form>(initialUserData);
  console.log({ user });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function validateField(name: keyof Form, value: string, required: boolean) {
    if (required && !value.trim()) return "Input field is empty";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format!";
    }

    if (name === "confirmPassword" && value !== user.password.value) {
      return "Passwords do not match!";
    }
  }

  function updateField(
    name: keyof Form,
    value: string,
    required: boolean,
    touched: boolean = false
  ) {
    setUser((prev) => {
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
            value={user.name.value}
            required
            errorMsg={user.name.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='email'
            id='email'
            label='Email'
            type='email'
            value={user.email.value}
            required
            errorMsg={user.email.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='password'
            id='password'
            label='Password'
            type='password'
            value={user.password.value}
            required
            errorMsg={user.password.errorMsg}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <FormInput
            name='confirmPassword'
            id='confirmPassword'
            label='Confirm password'
            type='password'
            value={user.confirmPassword.value}
            required
            errorMsg={user.confirmPassword.errorMsg}
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
