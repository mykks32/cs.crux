-- Teacher Table
CREATE TABLE Teacher
    (
        teacher_id INT,
        subject_id INT,
        dept_id    INT,
        PRIMARY KEY (subject_id, dept_id)
    )