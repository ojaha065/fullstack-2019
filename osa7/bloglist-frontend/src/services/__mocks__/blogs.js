const blogs = [
    {
        id: Math.random(),
        title: "Lorem Ipsum",
        author: "Jani Haiko",
        likes: 5,
        url: "https://www.example.com/",
        user: {
            username: "LoremIpsum"
        }
    },
    {
        id: Math.random(),
        title: "Tämä on otsikko",
        author: "Matti Meikäläinen",
        likes: 0,
        url: "http://www.esimerkki.fi/",
        user: {
            username: "MattiMeikalainen"
        }
    }
];

const getAll = () => {
    return Promise.resolve({
        data: blogs
    });
};

export default { getAll };