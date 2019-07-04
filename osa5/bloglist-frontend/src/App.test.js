import React from "react";
import "jest-dom/extend-expect";
import { render, waitForElement, cleanup } from "@testing-library/react";

import App from "./App";

jest.mock("./services/blogs.js");

// LocalStorage-mock
let localStorageSavedItems = {};
const localStorage = {
    setItem: (key,item) => {
        localStorageSavedItems[key] = item;
    },
    getItem: (key) => {
        return localStorageSavedItems[key];
    },
    clear: () => {
        localStorageSavedItems = {};
    }
};
Object.defineProperty(window,"localStorage",{
    value: localStorage
});

// Vaimennetaan turha virheilmoitus
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError
}) 

afterEach(cleanup);

test("If user is not logged in, blogs should not be rendered",async () => {
    const component = render(
        <App />
    );

    await waitForElement(() => {
        return component.getByText("Login");
    });

    expect(component.container).not.toHaveTextContent("Lorem Ipsum");
    expect(component.container).not.toHaveTextContent("Tämä on otsikko");
    expect(component.container).toHaveTextContent("Please log in");
});

test("After logging in, blogs should be rendered",async () => {
    let component = render(
        <App />
    );

    expect(component.container).toHaveTextContent("Please log in");

    // "Kirjaudutaan sisään"
    const user = {
        username: "Test",
        token: "NotRealToken",
        name: "Teija Testaaja"
    };
    localStorage.setItem("user",JSON.stringify(user));

    component = render(
        <App />
    );

    await waitForElement(() => {
        return component.getAllByTestId("fullInfo");
    });
});