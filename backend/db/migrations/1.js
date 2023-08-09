import { pool } from "../../config/db.js";

(async () => {
  try {
    await pool.query(
      `DROP TABLE IF EXISTS monitors CASCADE;
      CREATE TABLE monitors(
        id             TEXT PRIMARY KEY    NOT NULL,
        name           VARCHAR(255),
        domain_name    VARCHAR(255),
        created_at     TIMESTAMPTZ DEFAULT NOW()
    );
    
    DROP TABLE IF EXISTS monitor_events CASCADE;
    CREATE TABLE monitor_events(
        id                 TEXT PRIMARY KEY    NOT NULL,    
        responseTimeMs     INT,
        httpStatus         TEXT,
        httpStatusText     TEXT,
        success            BOOLEAN,
        monitorId          TEXT REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
        created_at         TIMESTAMPTZ DEFAULT NOW()
    );`
    );

    console.log("Created tables!");
  } catch (error) {
    console.log(error);
  }
})();
