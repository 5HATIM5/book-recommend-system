interface User {
    email: string;
    password: string;
  }
  
  const users: User[] = [
    { email: "admin@example.com", password: "12345678" },
    { email: "user@example.com", password: "12345678" },
  ];
  
  export const authenticateUser = (email: string, password: string): boolean => {
    return users.some((user) => user.email === email && user.password === password);
  };
  