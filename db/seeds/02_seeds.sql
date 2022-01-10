INSERT INTO users (name, email, password, created_at)
VALUES ('David Smith', 'david.smith@gmail.com','password','2018-02-12T08:00:00.000Z'),
('Jessica John', 'jess.john@gmail.com','password','2018-02-12T08:13:20.000Z'),
('Steven Bob', 'steven.bob@gmail.com','password','2018-02-12T08:13:20.000Z');

INSERT INTO quizzes (user_id, name, created_at, subject, difficulty, public)
VALUES (1, 'HTTP QUIZ', '2018-02-12T08:13:20.000Z','Web Development','easy',true);
VALUES (1, 'Test Quiz', '2018-02-12T08:13:20.000Z','Web Development','easy',false);


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

