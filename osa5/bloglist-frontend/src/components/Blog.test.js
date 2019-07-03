import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Blog from "./Blog";

const blog = {
    title: "Lorem Ipsum",
    author: "Jani Haiko",
    likes: 5,
    url: "https://www.example.com/",
    user: {
        username: "LoremIpsum"
    }
};
const activeUser = {
    username: "LoremIpsum"
};

afterEach(cleanup);

test("Alussa näkyvillä ovat vain nimi ja kirjoittaja",() => {
    const component = render(
        <Blog blog={blog} activeUser={activeUser} />
    );

    expect(component.container).toHaveTextContent(`${blog.title} by ${blog.author}`);
    expect(component.getByTestId("fullInfo")).not.toBeVisible();
});

test("Klikkaamalla saa näkyviin kaikki blogin tiedot",() => {
    const component = render(
        <Blog blog={blog} activeUser={activeUser} />
    );

    fireEvent.click(component.getByTestId("showFullInfo"));

    expect(component.getByTestId("fullInfo")).toBeVisible();
    expect(component.container).toHaveTextContent(`This blog was added by ${blog.user.username}`);
});