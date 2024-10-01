import Cookies from 'js-cookie';

const SignInFunction = async (values: any): Promise<any> => {
  const dataTranfer = {
    email: values.email,
    password: values.password,
    userName: values.username
  };
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dataTranfer)
  })
  
  const data = await response.json();
  if(data?.result) {
    const existCookie = Cookies.get('ff_token');
    if(existCookie) {
      Cookies.remove('ff_token');
    }
    Cookies.set('ff_token', data?.access_token);
  }
  return data?.result;
}

export default SignInFunction;