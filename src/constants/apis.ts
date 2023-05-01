export const auth = {
  signup: "/api/auth/signup",
  signin: "/api/auth/signin",
};

export const todos = {
  all: "/api/todos",
  create: "/api/todos",
  read: (id: string) => "/api/todos/" + id,
  update: (id: string) => "/api/todos/" + id,
  delete: (id: string) => "/api/todos/" + id,
};
