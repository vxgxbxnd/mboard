DROP TABLE IF EXISTS guestbook;

CREATE TABLE "guestbook"(
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "entry" TEXT NOT NULL,
    "entry_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);