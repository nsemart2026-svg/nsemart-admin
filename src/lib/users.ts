type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export async function authenticateUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return { id: user.id, name: user.name, email: user.email };
  }
  return null;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const exists = findUserByEmail(email);
  if (exists) {
    throw new Error("User already exists");
  }
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  return newUser;
}
