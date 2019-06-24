const supertest = require("supertest");
const mongoose = require("mongoose");

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
];

const app = require("../server.js");
const Blog = require("../models/blogi.js").Blog;

beforeEach(async () => {
    await Blog.deleteMany({});

    for(let blog of initialBlogs){
        await new Blog(blog).save();
    }
});

// ### Actual tests ###
const api = supertest(app);

test("API should return the right number (all) of blogs",async () => {
    const response = await api.get("/api/blogs").expect(200).expect("Content-Type",/application\/json/);

    expect(response.body.length).toBe(6);
});

afterAll(() => {
    mongoose.connection.close();
});