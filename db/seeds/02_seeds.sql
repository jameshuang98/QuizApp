INSERT INTO users (name, email, password, created_at)
VALUES ('David Smith', 'david.smith@gmail.com','password','2019-02-01 04:05:06'),
('Jessica John', 'jess.john@gmail.com','password','2020-03-01 03:07:06'),
('Steven Bob', 'steven.bob@gmail.com','password','2021-02-03 14:05:06');

INSERT INTO quizzes (user_id, name, created_at, subject, difficulty, public)
VALUES (1, 'HTTP QUIZ', '2021-03-01 14:05:06','Web Development','easy',true);

INSERT INTO questions (quiz_id, question)
VALUES (1, 'What does HTTP stand for?'),
(1, 'What is the purpose of HTTP?'),
(1, 'What is the difference between HTTP and HTTPS?'),
(1, 'When was the first version of HTTP finalized (HTTP 1.0)?');

INSERT INTO answers (question_id, answer, correct)
VALUES (1, 'HyperText Total Processing', false),
(1, 'Hypertext Transfer Protocol', true),
(1, 'HyperText Typecasting Program', false),
(2, 'HTTP is the standard markup language for websites', false),
(2, 'HTTP is a standardized system for compiling the font, color, graphics, and other styling for plain text files', false),
(2, 'HTTP is an application layer protocol which determines how website data is transmitted across the internet', true),
(3, 'HTTPS is used when multiple HTTP calls are made', false),
(3, 'HTTPS is the Canadian version of HTTP', false),
(3, 'HTTPS is HTTP with encryption', true),
(4, '1996', true),
(4, '2001', false),
(4, '2004', false);

