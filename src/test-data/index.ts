export let signupUsers = [
  {
    name: "Bruce Wayne",
    email: "BW@user.com",
    password: "@Pass1234",
    roles: ["ADMIN"],
  },
  { name: "Barry Allen", email: "BA@user.com", password: "@Pass1234" },
  { name: "Vic Stone", email: "VS@user.com", password: "@Pass1234" },
];

export let signinUsers = [
  { identifier: "BW@user.com", password: "@Pass1234" },
  { identifier: "BA@user.com", password: "@Pass1234" },
  { identifier: "VS@user.com", password: "@Pass1234" },
];

export let authSignupUsers: any[] = [];
export let authSigninUsers: any[] = [];

export let createTodos = [
  { label: "Clear Bat cave." },
  { label: "Meet Thwne." },
  { label: "Talk to Professor." },
];

export let updateTodos = [
  { label: "Clear Bat-Cave." },
  { label: "Meet Eobard Thwne." },
  { completed: true },
];

export let createdTodos: any[] = [];
export let updatedTodos: any[] = [];
