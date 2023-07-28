/*THIS FILE IS FOR REFERENCE ONLY. STATEMENTS MAY NOT BE CORRECT/COMPLETE*/

CREATE TABLE monitors(
    id             TEXT PRIMARY KEY    NOT NULL,
    name           VARCHAR(255),
    domain_name    VARCHAR(255),
    created_at     TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO monitors(id, name, domain_name) VALUES ('1', 'monitor one', 'https://www.google.com');


CREATE TABLE monitor_events(
    id                 TEXT PRIMARY KEY    NOT NULL,    
    responseTimeMs     INT,
    httpStatus         TEXT,
    httpStatusText     TEXT,
    success            BOOLEAN,
    monitorId          TEXT REFERENCES monitors(id) NOT NULL,
    created_at         TIMESTAMPTZ DEFAULT NOW()
);



INSERT INTO monitor_events(id, responseTimeMs, httpStatus, httpStatusText, success, monitorId) VALUES ('1', '332', '200', 'OK', TRUE, '1');
