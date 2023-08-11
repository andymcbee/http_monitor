/*THIS FILE IS FOR REFERENCE ONLY. STATEMENTS MAY NOT BE CORRECT/COMPLETE*/

    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS monitors CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS monitor_events CASCADE;



    CREATE TABLE accounts(
        id             TEXT PRIMARY KEY    NOT NULL,
        name           VARCHAR(255),
        created_at     TIMESTAMPTZ DEFAULT NOW()
    );


    CREATE TABLE users(
        id             TEXT PRIMARY KEY    NOT NULL,
        name           VARCHAR(255),
        email          VARCHAR(255) UNIQUE NOT NULL,
        accountId      TEXT REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
        created_at     TIMESTAMPTZ DEFAULT NOW()
    );




    CREATE TABLE monitors(
            id             TEXT PRIMARY KEY    NOT NULL,
            name           VARCHAR(255),
            domain_name    VARCHAR(255),
            accountId      TEXT REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
            created_at     TIMESTAMPTZ DEFAULT NOW()
        );
    
    CREATE TABLE monitor_events(
        id                 TEXT PRIMARY KEY    NOT NULL,    
        responseTimeMs     INT,
        httpStatus         TEXT,
        httpStatusText     TEXT,
        success            BOOLEAN,
        monitorId          TEXT REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
        accountId          TEXT REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
        created_at         TIMESTAMPTZ DEFAULT NOW()
    );