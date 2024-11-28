CREATE SCHEMA IF NOT EXISTS youknow;

CREATE TABLE youknow.users(
userId serial PRIMARY KEY,
usname varchar (20),
firstname varchar (20) NOT null,
lastname varchar (30),
email VARCHAR(255) UNIQUE NOT NULL,
bd timestamp,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE youknow.specialization(
specId serial PRIMARY KEY,
specname varchar (30),
experience_years int
);

CREATE TABLE youknow.experts(
expertId serial PRIMARY KEY,
userId int NOT NULL,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
bio TEXT,
specId int,
FOREIGN KEY (specId) REFERENCES youknow.specialization (specId)
);

CREATE TABLE youknow.experts_specialization(
expertId int,
specId int,
PRIMARY KEY (expertId ,specId),
FOREIGN KEY (expertId) REFERENCES youknow.experts (expertId),
FOREIGN KEY (specId) REFERENCES youknow.specialization (specId)
);



CREATE TABLE youknow.ttype(
typeId serial PRIMARY KEY,
typename varchar (20),
description TEXT 
);


CREATE TABLE youknow.keywords(
keywordsId serial PRIMARY KEY,
word varchar (30)
);

CREATE TABLE youknow.article(
articleId serial PRIMARY KEY,
userId int NOT NULL,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
title varchar (30),
contents TEXT,
typeId int,
FOREIGN KEY (typeId) REFERENCES youknow.ttype (typeId),
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE youknow.versions(
versId serial PRIMARY KEY,
articleId int,
FOREIGN KEY (articleId) REFERENCES youknow.article (articleId),
versionnum int,
contents TEXT,
expertId int,
FOREIGN KEY (expertId) REFERENCES youknow.experts (expertId),
updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE youknow.videos(
videoId serial PRIMARY KEY,
videoname varchar (30),
url VARCHAR(2048),
description TEXT,
userId int NOT NULL,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
typeId int,
FOREIGN KEY (typeId) REFERENCES youknow.ttype (typeId),
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
duration int
);



CREATE TABLE youknow.courses(
courseId serial PRIMARY KEY,
coursename varchar (40),
description TEXT,
userId int NOT null,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
typeId int,
FOREIGN KEY (typeId) REFERENCES youknow.ttype (typeId),
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated timestamp DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE youknow.authors(
authorId serial PRIMARY KEY,
firstname varchar (20),
lastname varchar (30),
bio TEXT,
bd timestamp NOT NULL,
dd timestamp
);

CREATE TABLE youknow.books(
bookId serial PRIMARY KEY,
bookname varchar (40),
description TEXT,
typeId int,
FOREIGN KEY (typeId) REFERENCES youknow.ttype (typeId),
isbn VARCHAR(17),
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE youknow.authors_books(
authorId int,
bookId int,
PRIMARY KEY (authorId, bookId),
FOREIGN KEY (authorId) REFERENCES youknow.authors (authorId),
FOREIGN KEY (bookId) REFERENCES youknow.books (bookId),
published_year int
);

CREATE TABLE youknow.keywords_all(
keywordsId int,
articleId int,
videoId int,
courseId int,
bookId int,
PRIMARY KEY (keywordsId, articleId, videoId, courseId , bookId),
FOREIGN KEY (keywordsId) REFERENCES youknow.keywords (keywordsId),
FOREIGN KEY (articleId) REFERENCES youknow.article (articleId),
FOREIGN KEY (videoId) REFERENCES youknow.videos (videoId),
FOREIGN KEY (courseId) REFERENCES youknow.courses (courseId),
FOREIGN KEY (bookId) REFERENCES youknow.books (bookId)
);

CREATE TABLE youknow.question(
qId serial PRIMARY KEY,
userId int,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
expertId int null,
FOREIGN KEY (expertId) REFERENCES youknow.experts (expertId),
contents TEXT,
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE youknow.answer(
aId serial PRIMARY KEY,
qId int,
FOREIGN KEY (qId) REFERENCES youknow.question (qId),
userId int,
FOREIGN KEY (userId) REFERENCES youknow.users (userId),
expertId int null,
FOREIGN KEY (expertId) REFERENCES youknow.experts (expertId),
contents TEXT,
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


