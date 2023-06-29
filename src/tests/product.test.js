const request = require("supertest");
const app = require("../app");
require("../models");
const Category = require("../models/Category");

const BASE_URL_USERS = "/api/v1/users/login";
let TOKEN;
const BASE_URL = "/api/v1/products";
let category;
let productId;

beforeAll(async () => {
  const user = {
    email: "yilbertosorio06@gmail.com",
    password: "123456",
  };

  const res = await request(app).post(`${BASE_URL_USERS}`).send(user);

  TOKEN = res.body.token;
});

test("POST -> 'BASE_URL, should return status code 201 and res.body.title === body.title", async () => {
  const categoryBody = {
    name: "home",
  };

  category = await Category.create(categoryBody);

  const product = {
    title: "Iphone 14",
    description: "Iphone14",
    price: "2.200",
    categoryId: category.id,
  };

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.title).toBe(product.title);
});

test("GET -> 'URL_BASE', should return status code 200 and res.body to have length 1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0]).toBeDefined();
});

test("GET One -> 'URL_BASE/:id', should return status code 200 and res.body.title === body.title", async () => {
  const res = await request(app).get(`${BASE_URL}/${productId}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe("Iphone 14");
});

test("Put -> 'URL_BASE', should return status code 200", async () => {
  const product = {
    title: "Iphone 13",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body.title).toBe(product.title);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.status).toBe(204);

  await category.destroy();
});
