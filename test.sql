      SELECT m.*, me.*
      FROM monitors m
      LEFT JOIN monitor_events me ON m.accountid = me.accountid
      WHERE m.accountid = $1
        AND me.created_at = (
          SELECT MAX(created_at)
          FROM monitor_events
          WHERE accountid = m.accountid
        );




      SELECT m.id, m.name, m.domain_name, me.responsetimems, me.httpstatus, me.httpstatustext
      FROM monitors m
      LEFT JOIN monitor_events me ON m.accountid = me.accountid
      WHERE m.accountid = '249ed53f-3ea8-4412-ad8f-dd89920c14cc'
        AND me.created_at = (
          SELECT MAX(created_at)
          FROM monitor_events
          WHERE accountid = m.accountid
        );




        SELECT m.id, m.name, m.domain_name, me.responsetimems, me.httpstatus, me.httpstatustext
        FROM monitors m
        JOIN (
            SELECT
                me1.*,
                ROW_NUMBER() OVER (PARTITION BY monitorId ORDER BY created_at DESC) AS rn
            FROM monitor_events me1
            WHERE me1.accountId = '249ed53f-3ea8-4412-ad8f-dd89920c14cc'
        ) me ON m.id = me.monitorId AND me.rn = 1
        WHERE m.accountId = '249ed53f-3ea8-4412-ad8f-dd89920c14cc';