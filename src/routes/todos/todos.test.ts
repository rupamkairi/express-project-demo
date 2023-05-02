import supertest from "supertest";
import app from "../../app";
import { auth, todos } from "../../constants/apis";
import {
  authSignupUsers,
  authSigninUsers,
  signinUsers,
  signupUsers,
  createTodos,
  createdTodos,
  updatedTodos,
  updateTodos,
} from "../../test-data";

describe("Test Todos by User", (i = 0) => {
  let res0 = null,
    res1: any = null,
    res2: any = null,
    res3: any = null,
    res4: any = null,
    res5: any = null;

  test("Signup User " + i, async () => {
    res0 = await supertest(app).post(auth.signup).send(signupUsers[i]);
    expect(res0.statusCode).toBe(200);
    authSignupUsers.push(res0.body.user);
  });

  test("Signin User " + i, async () => {
    res1 = await supertest(app).post(auth.signin).send(signinUsers[i]);
    expect(res1.statusCode).toBe(200);
    authSigninUsers.push(res1.body.user);
  });

  test("Create Todo for User " + i, async () => {
    res2 = await supertest(app)
      .post(todos.create)
      .set("Cookie", [`access_token=${res1.body.token}`])
      .send(createTodos[i]);

    expect(res2.statusCode).toBe(200);
    expect(res2.body.user).toEqual(res1.body.user._id);
    expect(res2.body.label).toEqual(createTodos[i].label);

    createdTodos.push(res2.body);
  });

  test("Update Todo for User " + i, async () => {
    res3 = await supertest(app)
      .put(todos.update(res2.body._id))
      .set("Cookie", [`access_token=${res1.body.token}`])
      .send(updateTodos[i]);

    expect(res3.statusCode).toBe(200);
    expect(res3.body.user).toEqual(res1.body.user._id);
    expect(res3.body.label).toEqual(updateTodos[i].label);

    updatedTodos.push(res3.body);
  });

  test("Read Todo for User " + i, async () => {
    res4 = await supertest(app)
      .get(todos.read(res3.body._id))
      .set("Cookie", [`access_token=${res1.body.token}`])
      .send(updateTodos[i]);

    expect(res4.statusCode).toBe(200);
    expect(res4.body.user._id).toEqual(res1.body.user._id);
    expect(res4.body.label).toEqual(updateTodos[i].label);
  });

  test("Delete Todo for User " + i, async () => {
    res5 = await supertest(app)
      .delete(todos.delete(res4.body._id))
      .set("Cookie", [`access_token=${res1.body.token}`]);

    expect(res5.statusCode).toBe(200);
    expect(res5.body.user).toEqual(res1.body.user._id);
    expect(res5.body.label).toEqual(updateTodos[i].label);
  });

  test("Read Todo for User " + i, async () => {
    res4 = await supertest(app)
      .get(todos.read(res5.body._id))
      .set("Cookie", [`access_token=${res1.body.token}`])
      .send(updateTodos[i]);

    expect(res4.statusCode).toBe(404);
  });
});

describe("Test Todos by Other User", () => {
  let user1: any = null,
    user2: any = null,
    created1: any = null,
    update2: any = null,
    read2: any = null,
    deleted2: any = null;

  test("Signup User 1", async () => {
    user1 = await supertest(app).post(auth.signup).send(signupUsers[1]);
    expect(user1.statusCode).toBe(200);
  });

  test("Signin User 1", async () => {
    user1 = await supertest(app).post(auth.signin).send(signinUsers[1]);
    expect(user1.statusCode).toBe(200);
    // console.log("User1", user1.body.user._id);
  });

  test("Create Todo for User 1", async () => {
    created1 = await supertest(app)
      .post(todos.create)
      .set("Cookie", [`access_token=${user1.body.token}`])
      .send(createTodos[1]);

    expect(created1.statusCode).toBe(200);
  });

  test("Signup User 2", async () => {
    user2 = await supertest(app).post(auth.signup).send(signupUsers[2]);
    expect(user2.statusCode).toBe(200);
  });

  test("Signin User 2", async () => {
    user2 = await supertest(app).post(auth.signin).send(signinUsers[2]);
    expect(user2.statusCode).toBe(200);
    // console.log("User2", user2.body.user._id);
  });

  test("Update Todo by Other User 2", async () => {
    update2 = await supertest(app)
      .put(todos.update(created1.body._id))
      .set("Cookie", [`access_token=${user2.body.token}`])
      .send(updateTodos[1]);

    expect(update2.statusCode).toBe(403);
  });

  test("Read Todo by Other User 2", async () => {
    read2 = await supertest(app)
      .get(todos.read(created1.body._id))
      .set("Cookie", [`access_token=${user2.body.token}`]);

    expect(read2.statusCode).toBe(200);
  });

  test("Delete Todo by Other User 2", async () => {
    deleted2 = await supertest(app)
      .delete(todos.delete(created1.body._id))
      .set("Cookie", [`access_token=${user2.body.token}`]);

    expect(deleted2.statusCode).toBe(403);
  });
});
