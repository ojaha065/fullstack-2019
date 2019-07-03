import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import SimpleBlog from "./SimpleBlog";

const blog = {
    title: "Lorem Ipsum",
    author: "Jani Haiko",
    likes: 5
};

afterEach(cleanup);

test("Renders title, author and the number of likes",() => {
    const component = render(
        <SimpleBlog blog={blog} />
    );

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`);
});

test("Like button event handler is called every time the button is pressed",() => {
    const mockHandler = jest.fn();

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    fireEvent.click(component.getByTestId("likeButton"));
    fireEvent.click(component.getByTestId("likeButton"));

    expect(mockHandler.mock.calls.length).toBe(2);
});