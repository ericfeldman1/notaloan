CREATE TABLE IF NOT EXISTS notaloan_careers (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    locality TEXT NOT NULL,
    salary INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES notaloan_users(id) ON DELETE CASCADE NOT NULL
);