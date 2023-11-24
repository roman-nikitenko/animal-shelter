// @ts-ignore

const BASE_URL = 'https://happy-paws-animal-shelter.onrender.com';

type AccessUser = {
  password: string,
  email: string
}

export async function logIn(user: AccessUser) {
  const response = await fetch(BASE_URL + '/api/users/token/', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {'Content-Type': 'application/json'}
  });

  if (!response.ok) {
    throw 'Something went wrong with log in'
  }

  return response.json();
}

export async function getUser(token: string) {
  const response = await fetch(BASE_URL + '/api/users/me/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw 'Something went wrong to get user from server'
  }

  return response.json()
}

