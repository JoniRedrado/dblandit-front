export const loginValidation = (inputs) => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  let errors = {}

  if( !regexEmail.test(inputs.email) ) errors.email = 'Debe ser un correo electrónico';
  if ( inputs.email.length === 0 ) errors.email = 'El email no puede estar vacio';

  if ( inputs.password.length === 0 ) errors.password = 'La contraseña no puede estar vacia';

  return errors
}

export const signUpValidation = (inputs)=>{
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  let errors = {}

  if( !regexEmail.test(inputs.email) ) errors.email = 'Debe ser un correo electrónico';
  if ( inputs.email.length === 0 ) errors.email = 'El email no puede estar vacio';

  if ( inputs.password.length === 0 ) errors.password = 'La contraseña no puede estar vacia';

  if ( inputs.username.length === 0 ) errors.username = 'El nombre de usuario no puede estar vacio';

  return errors
}