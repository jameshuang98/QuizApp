INSERT INTO questions (id, quiz_id, question)
VALUES (1, 1, 'What does HTTP stand for?'),
(2, 1, 'What is the purpose of HTTP?'),
(3, 1, 'What is the difference between HTTP and HTTPS?'),
(4, 1, 'When was the first version of HTTP finalized (HTTP 1.0)?');

INSERT INTO answers (id, question_id, answer, correct)
VALUES (1, 1, 'HyperText Total Processing', false),
(2, 1, 'Hypertext Transfer Protocol', true),
(3, 1, 'HyperText Typecasting Program', false),
(4, 2, 'HTTP is the standard markup language for websites', false),
(5, 2, 'HTTP is a standardized system for compiling the font, color, graphics, and other styling for plain text files', false),
(6, 2, 'HTTP is an application layer protocol which determines how website data is transmitted across the internet', true),
(7, 3, 'HTTPS is used when multiple HTTP calls are made', false),
(8, 3, 'HTTPS is the Canadian version of HTTP', false),
(9, 3, 'HTTPS is HTTP with encryption', true),
(10, 4, '1996', true),
(11, 4, '2001', false),
(12, 4, '2004', false);
