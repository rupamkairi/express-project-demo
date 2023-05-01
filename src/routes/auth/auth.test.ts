import supertest from "supertest";
import app from "../../app";
import { auth } from "../../constants/apis";
import {
  authSignupUsers,
  authSigninUsers,
  signinUsers,
  signupUsers,
} from "../../test-data";

describe("Test Signup 0", (i = 0) => {
  test("User " + i, async () => {
    const res = await supertest(app).post(auth.signup).send(signupUsers[i]);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.name).toBe(signupUsers[i].name);
    expect(res.body.user.roles).toContain("ADMIN");

    authSignupUsers.push(res.body.user);
  });
});

describe("Test Signup 1", (i = 1) => {
  test("User " + i, async () => {
    const res = await supertest(app).post(auth.signup).send(signupUsers[i]);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.name).toBe(signupUsers[i].name);
    expect(res.body.user.roles).toContain("USER");

    authSignupUsers.push(res.body.user);
  });
});

describe("Test Signup 2", (i = 2) => {
  test("User " + i, async () => {
    const res = await supertest(app).post(auth.signup).send(signupUsers[i]);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.name).toBe(signupUsers[i].name);
    expect(res.body.user.roles).toContain("USER");

    authSignupUsers.push(res.body.user);
  });
});

describe("Test Signin 0", (i = 0) => {
  test("User " + i, async () => {
    const res = await supertest(app).post(auth.signin).send(signinUsers[i]);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.roles).toContain("ADMIN");

    authSigninUsers.push(res.body.user);
  });
});

describe("Test Signin 1", (i = 1) => {
  test("User " + i, async () => {
    const res = await supertest(app).post(auth.signin).send(signinUsers[i]);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.roles).toContain("USER");

    authSigninUsers.push(res.body.user);
  });
});
