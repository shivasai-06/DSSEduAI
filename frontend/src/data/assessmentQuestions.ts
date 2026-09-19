export interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate';
}

export const questions: Question[] = [
  // Python
  { id: 'py_1', topic: 'Python', question: 'What is the output of print(2 ** 3)?', options: ['5', '6', '8', '9'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'py_2', topic: 'Python', question: 'Which keyword is used to define a function in Python?', options: ['function', 'def', 'func', 'define'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'py_3', topic: 'Python', question: 'What data type is the result of: x = [1, 2, 3]?', options: ['Tuple', 'Set', 'Dictionary', 'List'], correctAnswer: 3, difficulty: 'beginner' },
  { id: 'py_4', topic: 'Python', question: 'How do you insert comments in Python code?', options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'py_5', topic: 'Python', question: 'What is the correct file extension for Python files?', options: ['.pyth', '.pt', '.py', '.pyt'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'py_6', topic: 'Python', question: 'Which method can be used to return a string in upper case letters?', options: ['upperCase()', 'toUpperCase()', 'upper()', 'uppercase()'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'py_7', topic: 'Python', question: 'Which operator is used to multiply numbers?', options: ['%', 'x', '*', '#'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'py_8', topic: 'Python', question: 'Which collection is ordered, changeable, and allows duplicate members?', options: ['Dictionary', 'Tuple', 'Set', 'List'], correctAnswer: 3, difficulty: 'intermediate' },
  { id: 'py_9', topic: 'Python', question: 'What is the correct way to create a dictionary in Python?', options: ['x = {1: "apple", 2: "banana"}', 'x = [1: "apple", 2: "banana"]', 'x = (1: "apple", 2: "banana")', 'x = <1: "apple", 2: "banana">'], correctAnswer: 0, difficulty: 'intermediate' },
  { id: 'py_10', topic: 'Python', question: 'Which of the following is used to handle exceptions in Python?', options: ['try...except', 'catch...finally', 'do...while', 'handle...catch'], correctAnswer: 0, difficulty: 'intermediate' },

  // Java
  { id: 'ja_1', topic: 'Java', question: 'What is the size of an int variable in Java?', options: ['8 bit', '16 bit', '32 bit', '64 bit'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'ja_2', topic: 'Java', question: 'Which component is used to compile, debug and execute Java programs?', options: ['JRE', 'JIT', 'JDK', 'JVM'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'ja_3', topic: 'Java', question: 'Which statement is used to declare a constant in Java?', options: ['const', 'static', 'final', 'immutable'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'ja_4', topic: 'Java', question: 'What is the extension of java code files?', options: ['.js', '.txt', '.class', '.java'], correctAnswer: 3, difficulty: 'beginner' },
  { id: 'ja_5', topic: 'Java', question: 'Which method is the entry point for any Java program?', options: ['start()', 'main()', 'init()', 'run()'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'ja_6', topic: 'Java', question: 'What is it called when a class has multiple methods with the same name but different parameters?', options: ['Overriding', 'Overloading', 'Polymorphism', 'Inheritance'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'ja_7', topic: 'Java', question: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'inherits', 'extends', 'super'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'ja_8', topic: 'Java', question: 'Which collection does not allow duplicate elements in Java?', options: ['List', 'Queue', 'Set', 'Map'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'ja_9', topic: 'Java', question: 'Which of the following is not an access modifier in Java?', options: ['public', 'private', 'protected', 'package'], correctAnswer: 3, difficulty: 'intermediate' },
  { id: 'ja_10', topic: 'Java', question: 'What is the superclass of all classes in Java?', options: ['Main', 'Class', 'Object', 'System'], correctAnswer: 2, difficulty: 'intermediate' },

  // SQL
  { id: 'sq_1', topic: 'SQL', question: 'What does SQL stand for?', options: ['Strong Question Language', 'Structured Query Language', 'Structured Question Language', 'Standard Query Language'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'sq_2', topic: 'SQL', question: 'Which SQL statement is used to extract data from a database?', options: ['EXTRACT', 'GET', 'OPEN', 'SELECT'], correctAnswer: 3, difficulty: 'beginner' },
  { id: 'sq_3', topic: 'SQL', question: 'Which SQL statement is used to update data in a database?', options: ['SAVE', 'MODIFY', 'UPDATE', 'SAVE AS'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'sq_4', topic: 'SQL', question: 'Which SQL statement is used to insert new data in a database?', options: ['ADD NEW', 'INSERT INTO', 'INSERT NEW', 'ADD RECORD'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'sq_5', topic: 'SQL', question: 'How do you select a column named "FirstName" from a table named "Persons"?', options: ['SELECT Persons.FirstName', 'SELECT FirstName FROM Persons', 'EXTRACT FirstName FROM Persons', 'GET FirstName FROM Persons'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'sq_6', topic: 'SQL', question: 'Which operator is used to search for a specified pattern in a column?', options: ['GET', 'LIKE', 'MATCH', 'PATTERN'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'sq_7', topic: 'SQL', question: 'Which SQL statement is used to return only different values?', options: ['SELECT DISTINCT', 'SELECT DIFFERENT', 'SELECT UNIQUE', 'SELECT DIVERSE'], correctAnswer: 0, difficulty: 'intermediate' },
  { id: 'sq_8', topic: 'SQL', question: 'Which keyword is used to sort the result-set?', options: ['SORT BY', 'ORDER BY', 'ALIGN BY', 'ORGANIZE BY'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'sq_9', topic: 'SQL', question: 'What is a JOIN used for in SQL?', options: ['To delete tables', 'To insert new tables', 'To combine rows from two or more tables', 'To format output'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'sq_10', topic: 'SQL', question: 'Which aggregate function returns the total sum of a numeric column?', options: ['SUM()', 'TOTAL()', 'ADD()', 'COUNT()'], correctAnswer: 0, difficulty: 'intermediate' },

  // HTML/CSS
  { id: 'hc_1', topic: 'HTML/CSS', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Markup Language'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'hc_2', topic: 'HTML/CSS', question: 'Which HTML tag is used to define an internal style sheet?', options: ['<css>', '<script>', '<style>', '<design>'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'hc_3', topic: 'HTML/CSS', question: 'Which HTML attribute is used to define inline styles?', options: ['class', 'style', 'font', 'styles'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'hc_4', topic: 'HTML/CSS', question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'hc_5', topic: 'HTML/CSS', question: 'Which property is used to change the background color in CSS?', options: ['color', 'bgcolor', 'background-color', 'background'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'hc_6', topic: 'HTML/CSS', question: 'How do you select an element with id "demo" in CSS?', options: ['.demo', '*demo', '#demo', 'demo'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'hc_7', topic: 'HTML/CSS', question: 'How do you select elements with class name "test" in CSS?', options: ['#test', '*test', 'test', '.test'], correctAnswer: 3, difficulty: 'intermediate' },
  { id: 'hc_8', topic: 'HTML/CSS', question: 'Which CSS property controls the text size?', options: ['font-size', 'text-style', 'text-size', 'font-style'], correctAnswer: 0, difficulty: 'intermediate' },
  { id: 'hc_9', topic: 'HTML/CSS', question: 'In CSS, what is the default value of the position property?', options: ['absolute', 'fixed', 'relative', 'static'], correctAnswer: 3, difficulty: 'intermediate' },
  { id: 'hc_10', topic: 'HTML/CSS', question: 'What is the correct HTML for creating a hyperlink?', options: ['<a name="http://www.example.com">Example</a>', '<a href="http://www.example.com">Example</a>', '<a url="http://www.example.com">Example</a>', '<a>http://www.example.com</a>'], correctAnswer: 1, difficulty: 'intermediate' },

  // JavaScript
  { id: 'js_1', topic: 'JavaScript', question: 'Inside which HTML element do we put the JavaScript?', options: ['<scripting>', '<javascript>', '<script>', '<js>'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'js_2', topic: 'JavaScript', question: 'Where is the correct place to insert a JavaScript?', options: ['The <body> section', 'The <head> section', 'Both the <head> section and the <body> section are correct', 'The <footer> section'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'js_3', topic: 'JavaScript', question: 'How do you write "Hello World" in an alert box?', options: ['msgBox("Hello World");', 'alert("Hello World");', 'msg("Hello World");', 'alertBox("Hello World");'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'js_4', topic: 'JavaScript', question: 'How do you create a function in JavaScript?', options: ['function:myFunction()', 'function = myFunction()', 'function myFunction()', 'def myFunction()'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'js_5', topic: 'JavaScript', question: 'How to write an IF statement in JavaScript?', options: ['if i = 5', 'if i == 5 then', 'if (i == 5)', 'if i = 5 then'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'js_6', topic: 'JavaScript', question: 'Which of the following is not a reserved word in JavaScript?', options: ['interface', 'throws', 'program', 'short'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'js_7', topic: 'JavaScript', question: 'What will be the output of `typeof null` in JavaScript?', options: ['"null"', '"object"', '"undefined"', '"number"'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'js_8', topic: 'JavaScript', question: 'Which method is used to serialize an object into a JSON string?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.objectify()', 'JSON.toString()'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'js_9', topic: 'JavaScript', question: 'What does the `===` operator do?', options: ['Compares values only', 'Assigns a value', 'Compares values and types', 'Checks for inequality'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'js_10', topic: 'JavaScript', question: 'Which array method removes the last element from an array?', options: ['push()', 'pop()', 'shift()', 'slice()'], correctAnswer: 1, difficulty: 'intermediate' },

  // Data Structures
  { id: 'ds_1', topic: 'Data Structures', question: 'Which data structure uses LIFO (Last In First Out)?', options: ['Queue', 'Stack', 'Tree', 'Array'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'ds_2', topic: 'Data Structures', question: 'Which data structure uses FIFO (First In First Out)?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'ds_3', topic: 'Data Structures', question: 'What is the time complexity to access an element in an array by its index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'ds_4', topic: 'Data Structures', question: 'Which of the following is a non-linear data structure?', options: ['Array', 'Linked List', 'Tree', 'Stack'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'ds_5', topic: 'Data Structures', question: 'In a linked list, each element points to the ________ element.', options: ['Previous', 'Next', 'First', 'Last'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'ds_6', topic: 'Data Structures', question: 'What is a hash table used for?', options: ['Sorting elements', 'Fast data retrieval', 'Storing hierarchical data', 'Mathematical calculations'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'ds_7', topic: 'Data Structures', question: 'In a Binary Search Tree, elements smaller than the root are placed on the ________.', options: ['Right', 'Left', 'Top', 'Bottom'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'ds_8', topic: 'Data Structures', question: 'Which traversal method of a BST visits nodes in ascending order?', options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'ds_9', topic: 'Data Structures', question: 'What data structure is typically used to implement recursion?', options: ['Queue', 'Tree', 'Graph', 'Stack'], correctAnswer: 3, difficulty: 'intermediate' },
  { id: 'ds_10', topic: 'Data Structures', question: 'A complete graph with N vertices has how many edges?', options: ['N * (N-1) / 2', 'N * N', 'N - 1', 'N * (N+1) / 2'], correctAnswer: 0, difficulty: 'intermediate' },

  // Cybersecurity
  { id: 'cy_1', topic: 'Cybersecurity', question: 'What does HTTPS stand for?', options: ['HyperText Transfer Protocol Standard', 'HyperText Transfer Protocol Secure', 'HyperText Transmission Protocol System', 'Hyper Transfer Text Protocol Security'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'cy_2', topic: 'Cybersecurity', question: 'Which of the following is a common method to steal passwords?', options: ['Phishing', 'Defragmentation', 'Encryption', 'Hashing'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'cy_3', topic: 'Cybersecurity', question: 'What is the main purpose of a firewall?', options: ['To speed up the network', 'To block unauthorized access', 'To store passwords', 'To clean viruses'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'cy_4', topic: 'Cybersecurity', question: 'What does VPN stand for?', options: ['Virtual Public Network', 'Visual Private Network', 'Virtual Private Network', 'Virtual Protected Network'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'cy_5', topic: 'Cybersecurity', question: 'Which of the following describes malware?', options: ['Hardware failure', 'Malicious software', 'Network cable', 'A type of operating system'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'cy_6', topic: 'Cybersecurity', question: 'What is a DDoS attack?', options: ['Direct Data Output System', 'Distributed Denial of Service', 'Data Deletion or Sabotage', 'Digital Defense Operating System'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'cy_7', topic: 'Cybersecurity', question: 'Which cryptographic concept ensures that a sender cannot deny having sent a message?', options: ['Confidentiality', 'Integrity', 'Non-repudiation', 'Authentication'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'cy_8', topic: 'Cybersecurity', question: 'What is the difference between symmetric and asymmetric encryption?', options: ['Symmetric uses one key; asymmetric uses two keys.', 'Symmetric uses two keys; asymmetric uses one key.', 'Symmetric is for software; asymmetric is for hardware.', 'There is no difference.'], correctAnswer: 0, difficulty: 'intermediate' },
  { id: 'cy_9', topic: 'Cybersecurity', question: 'What does "SQL Injection" primarily attack?', options: ['Web browsers', 'Databases', 'Operating Systems', 'Network Routers'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'cy_10', topic: 'Cybersecurity', question: 'What is two-factor authentication (2FA)?', options: ['Using a password and a PIN', 'Requiring two separate forms of identification', 'Typing the password twice', 'Logging in from two different devices'], correctAnswer: 1, difficulty: 'intermediate' },

  // AI/ML
  { id: 'ai_1', topic: 'AI/ML', question: 'What does AI stand for?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Applied Intelligence', 'Advanced Intelligence'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'ai_2', topic: 'AI/ML', question: 'What does ML stand for?', options: ['Machine Learning', 'Memory Logic', 'Mathematical Learning', 'Mainframe Logic'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'ai_3', topic: 'AI/ML', question: 'Which of the following is a subset of Machine Learning?', options: ['Cloud Computing', 'Deep Learning', 'Quantum Computing', 'Blockchain'], correctAnswer: 1, difficulty: 'beginner' },
  { id: 'ai_4', topic: 'AI/ML', question: 'In supervised learning, models are trained on ________ data.', options: ['Unlabeled', 'Raw', 'Labeled', 'Random'], correctAnswer: 2, difficulty: 'beginner' },
  { id: 'ai_5', topic: 'AI/ML', question: 'What is a neural network modeled after?', options: ['The human brain', 'A computer CPU', 'A spider web', 'A decision tree'], correctAnswer: 0, difficulty: 'beginner' },
  { id: 'ai_6', topic: 'AI/ML', question: 'Which of the following is an unsupervised learning algorithm?', options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'Random Forest'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'ai_7', topic: 'AI/ML', question: 'What is "overfitting" in machine learning?', options: ['When a model performs well on training data but poorly on unseen data', 'When a model is too simple to capture the underlying pattern', 'When a model trains too quickly', 'When a dataset has too many features'], correctAnswer: 0, difficulty: 'intermediate' },
  { id: 'ai_8', topic: 'AI/ML', question: 'Which activation function is most commonly used in the hidden layers of deep neural networks?', options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'], correctAnswer: 2, difficulty: 'intermediate' },
  { id: 'ai_9', topic: 'AI/ML', question: 'What does NLP stand for in AI?', options: ['New Logic Processing', 'Natural Language Processing', 'Neural Learning Protocol', 'Network Link Protocol'], correctAnswer: 1, difficulty: 'intermediate' },
  { id: 'ai_10', topic: 'AI/ML', question: 'Which metric is commonly used to evaluate classification models?', options: ['Mean Squared Error', 'R-squared', 'Accuracy', 'Gradient Descent'], correctAnswer: 2, difficulty: 'intermediate' }
];
