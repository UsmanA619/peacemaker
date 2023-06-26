import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/, 'Invalid email')
    .required('Email is required'),  password: Yup.string().required('Password is required'),
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().matches(/^[A-Za-z]+$/,"Please enter a valid name.").required('First Name is required'),
  lastName: Yup.string().matches(/^[A-Za-z]+$/,"Please enter a valid name.").required('Last Name is required'),
  DOB: Yup.string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(19|20)\d\d$/,
      'Invalid date format. Must be dd-mm-yyyy',
    )
    .required(),
  location: Yup.string().required('Location is required'),
  height: Yup.number().required('Height is required'),
  weight: Yup.number().required('Weight is required'),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/, 'Invalid email')
    .required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/, 'Invalid email')
    .required('Email is required'),
});

export const newPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(8, "New password must be at least 8 characters").required('New Password is required'),
  confirmPassword: Yup.string().min(8, "Confirm password must be at least 8 characters")
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password not the same with new password'),
});
