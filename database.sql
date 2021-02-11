CREATE DATABASE "giphy_search_favorites";

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (200),
    "category_id" INT REFERENCES "category"
);

INSERT INTO "favorites" ("url", "category_id")
VALUES ('https://media1.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif?cid=ecf05e47apbe3ix8h1tl6tbomhxov9ostvm90kuc2edttcbc&rid=giphy.gif', '2');