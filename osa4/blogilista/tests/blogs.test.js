const supertest = require("supertest");
const mongoose = require("mongoose");

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
];
const newBlog = {
    title: "Lorem Ipsum",
    author: "Jani Haiko",
    url: "https://www.example.com/",
    likes: 2
};

// Pakollisen autentikoinnin lisäämisen jälkeen
// korjasin osan testeistä kirjautumista, mutta
// en kaikkia, koska testien korjaamista
// ei vaadittu tehtävissä.
const login = {
    username: "TestUser",
    password: "password"
};

const app = require("../server.js");
const Blog = require("../models/blogi.js").Blog;
const User = require("../models/user.js").User;

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    for(let blog of initialBlogs){
        await new Blog(blog).save();
    }

    await new User({
        username: "TestUser",
        password: "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86", // "password"
        name: "Test user",
        blogs: []
    }).save();
});

// ### Actual tests ###
const api = supertest(app);

describe("GET /api/blogs",() => {
    test("API should return the right number (all) of blogs",async () => {
        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });

    test("All blogs should have property 'id'",async () => {
        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });
});

describe("POST /api/blogs",() => {
    test("API should return the right number of blogs after POST",async () => {
        const loginResponse = await api.post("/api/login").send(login);
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(newBlog).expect(201);
        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length + 1);
    });

    test("New blog should be correctly defined",async () => {
        const loginResponse = await api.post("/api/login").send(login);
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(newBlog).expect(201);
        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body[response.body.length - 1]).toMatchObject(newBlog);
    });

    test("All blogs should have property 'id'",async () => {
        const loginResponse = await api.post("/api/login").send(login);
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(newBlog).expect(201);
        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });

    test("If number of likes is not given, likes should be set to zero",async () => {
        const loginResponse = await api.post("/api/login").send(login);

        let copy = {...newBlog};
        delete copy.likes;
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(copy).expect(201);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body[response.body.length - 1].likes).toBe(0);
    });

    test("New blogs without title or url should not be accepted",async () => {
        const loginResponse = await api.post("/api/login").send(login);

        let copy = {...newBlog};
        delete copy.title;
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(copy).expect(400);

        copy = {...newBlog};
        delete copy.url;
        await api.post("/api/blogs").set("Authorization",`Bearer ${loginResponse.body.token}`).send(copy).expect(400);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });
});

describe("DELETE /api/blogs",() => {
    test("API should return the right number of blogs after DELETE",async () => {
        const loginResponse = await api.post("/api/login").send(login);

        let id = await api.get("/api/blogs");
        id = id.body[0].id;
        await api.delete(`/api/blogs/${id}`).set("Authorization",`Bearer ${loginResponse.body.token}`).expect(205);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length - 1);
    });

    test("Wrong or missing ID returns 404",async () => {
        const loginResponse = await api.post("/api/login").send(login);

        await api.delete("/api/blogs/LoremIpsum").set("Authorization",`Bearer ${loginResponse.body.token}`).expect(404);
        await api.delete("/api/blogs/").set("Authorization",`Bearer ${loginResponse.body.token}`).expect(404);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });
});

describe("PUT /api/blogs",() => {
    test("API should return the right number of blogs after PUT",async () => {
        let id = await api.get("/api/blogs");
        id = id.body[0].id;
        await api.put(`/api/blogs/${id}`).send(newBlog).expect(205);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });

    test("Modified blog should be correctly defined",async () => {
        let id = await api.get("/api/blogs");
        id = id.body[0].id;
        await api.put(`/api/blogs/${id}`).send(newBlog).expect(205);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body[0]).toMatchObject(newBlog);
    });

    test("Wrong or missing ID returns 404",async () => {
        await api.put("/api/blogs/LoremIpsum").send(newBlog).expect(404);
        await api.put("/api/blogs/").send(newBlog).expect(404);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });

    test("If number of likes is not given, likes should be set to zero",async () => {
        let id = await api.get("/api/blogs");
        id = id.body[0].id;
        let copy = {...newBlog};
        delete copy.likes;
        await api.put(`/api/blogs/${id}`).send(copy).expect(205);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body[0].likes).toBe(0);
    });

    test("Modified blogs without title or url should not be accepted",async () => {
        let id = await api.get("/api/blogs");
        id = id.body[0].id;
        let copy = {...newBlog};
        delete copy.title;
        await api.put(`/api/blogs/${id}`).send(copy).expect(400);

        copy = {...newBlog};
        delete copy.url;
        await api.put(`/api/blogs/${id}`).send(copy).expect(400);

        const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});