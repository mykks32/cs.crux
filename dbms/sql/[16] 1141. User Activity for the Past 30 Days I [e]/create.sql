-- ACTIVITY_TYPE Enum
CREATE TYPE ACTIVITY_TYPE_ACTION
AS ENUM ('open_session', 'end_session', 'scroll_down', 'send_message');

-- Activity Table
CREATE TABLE Activity
    (
        user_id       INT,
        session_id    INT,
        activity_date DATE,
        activity_type ACTIVITY_TYPE_ACTION
    )