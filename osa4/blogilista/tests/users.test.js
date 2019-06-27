const supertest = require("supertest");
const mongoose = require("mongoose");

const initialUsers = [
    {
        name: "Matti Meikäläinen",
        username: "LoremIpsum",
        password: "thisIsHash" 
    },
    {
        name: "Lorem Ipsum",
        username: "kissakala",
        password: "thisIsHash"
    }
];
const newUser = {
    name: "Jani Haiko",
    username: "JaHa1",
    password: "kissakala"
};
const newUserPasswordHash = "0b006251c563ea80622891f5ba2a4cd90d3fcb40bd9937541876a1effbc49293fb36e742e27365b21026afcf667770627082c81690da6aa486a6f0cddaebdeb7";

const app = require("../server.js");
const User = require("../models/user.js").User;

beforeEach(async () => {
    await User.deleteMany({});

    for(let user of initialUsers){
        await new User(user).save();
    }
});

// ### Actual tests ###
const api = supertest(app);

describe("GET /api/users",() => {
    test("API should return empty array when there are no users",async () => {
        await User.deleteMany({});
        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(0);
    });

    test("API should return correct data for all users",async () => {
        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialUsers.length);
        expect(response.body).toMatchObject(initialUsers);
    });
});

describe("POST /api/users",() => {
    test("API should return the right number of users after POST",async () => {
        await api.post("/api/users").send(newUser).expect(201);
        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialUsers.length + 1);
    });

    test("The password of the new user should be correctly hashed",async () => {
        await api.post("/api/users").send(newUser).expect(201);
        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body[response.body.length - 1].password).toBe(newUserPasswordHash);
    });

    test("Too short password should not be accepted",async () => {
        let copy = {...newUser};
        copy.password = "ki";
        await api.post("/api/users").send(copy).expect(400).expect("Content-Type",/application\/json/);

        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialUsers.length);
    });

    test("Too short username should not be accepted",async () => {
        let copy = {...newUser};
        copy.username = "Ja";
        await api.post("/api/users").send(copy).expect(400).expect("Content-Type",/application\/json/);

        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialUsers.length);
    });

    test("Users without username or password should not be accepted",async () => {
        let copy = {...newUser};
        delete copy.username;
        await api.post("/api/users").send(copy).expect(400).expect("Content-Type",/application\/json/);

        copy = {...newUser};
        delete copy.password;
        await api.post("/api/users").send(copy).expect(400).expect("Content-Type",/application\/json/);

        const response = await api.get("/api/users").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialUsers.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});