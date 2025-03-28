interface User {
    email: string;
    password: string;
  }
  
  const users: User[] = [
    { email: "admin@example.com", password: "25467873" },
    { email: "user@example.com", password: "25467873" },
  ];
  
  export const authenticateUser = (email: string, password: string): boolean => {
    return users.some((user) => user.email === email && user.password === password);
  };
  