"use strict";

module.exports = {
    dummy: (blogs) => {
        return 1;
    },
    totalLikes: (blogs) => {
        let total = 0;
        if(Array.isArray(blogs)){
            blogs.forEach((blog) => {
                if(blog.likes){
                    total += Number(blog.likes);
                }
            });
            return total;
        }
        else{
            return -1;
        }
    },
    favoriteBlog: (blogs) => {
        if(Array.isArray(blogs) && blogs.length > 0){
            let favorite;
            blogs.forEach((blog) => {
                if(!favorite || blog.likes > favorite.likes){
                    favorite = blog;
                }
            });
            return {
                title: favorite.title || "",
                author: favorite.author || "",
                likes: favorite.likes
            };
        }
        else{
            return null;
        }
    },
    mostBlogs: (blogs) => {
        if(Array.isArray(blogs) && blogs.length > 0){
            // Haetaan kaikki kirjoittajat
            const authors = blogs.map((blog) => {
                return blog.author;
            });

            // Alustetaan taulukko, jossa on paikka jokaiselle kirjoittajalle
            let numbersOfBlogs = new Array(authors.length).fill(0);

            // Käydään blogit läpi
            blogs.forEach((blog) => {
                // Etsitään tämän blogin kirjoittajan indeksi
                const selected_index = authors.findIndex((author) => {
                    return author === blog.author;
                });

                // Tallennetaan
                numbersOfBlogs[selected_index]++;
            });

            // Haetaan isoin lukumäärä ja sitä vastaava kirjoittaja
            const maxBlogs = Math.max(...numbersOfBlogs);
            const maxWriter = authors[numbersOfBlogs.findIndex(thisValue => {return thisValue === maxBlogs })];
            
            return {
                author: maxWriter,
                blogs: maxBlogs
            };
        }
        else{
            return null;
        }
    },
    mostLikes: (blogs) => {
        if(Array.isArray(blogs) && blogs.length > 0){
            // Haetaan kaikki kirjoittajat
            const authors = blogs.map((blog) => {
                return blog.author;
            });

            // Alustetaan taulukko, jossa on paikka jokaiselle kirjoittajalle
            let numbersOfLikes = new Array(authors.length).fill(0);

            // Käydään blogit läpi
            blogs.forEach((blog) => {
                // Etsitään tämän blogin kirjoittajan indeksi
                const selected_index = authors.findIndex((author) => {
                    return author === blog.author;
                });

                // Tallennetaan
                if(blog.likes){
                    numbersOfLikes[selected_index] += Number(blog.likes);
                }
            });

            // Haetaan isoin lukumäärä ja sitä vastaava kirjoittaja
            const maxLikes = Math.max(...numbersOfLikes);
            const maxWriter = authors[numbersOfLikes.findIndex(thisValue => {return thisValue === maxLikes })];
            
            return {
                author: maxWriter,
                likes: maxLikes
            };
        }
        else{
            return null;
        }
    }
};