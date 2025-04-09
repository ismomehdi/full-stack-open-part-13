CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Martin', 'www.example.com', 'How to make easy money fast', 5);
insert into blogs (url, title) values ('www.google.com', 'Fear of missing out');
