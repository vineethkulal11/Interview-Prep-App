export const categories = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Fundamental concepts, syntax, and basic OOP principles.',
    icon: 'star-outline',
    color: '#3B82F6',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Collections, Multithreading, Exception Handling, and more.',
    icon: 'star-half',
    color: '#10B981',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'JVM internals, Design Patterns, Concurrency utilities.',
    icon: 'star',
    color: '#8B5CF6',
  },
  {
    id: 'experience',
    title: 'Scenario Based (Exp)',
    description: 'Real-world problem solving and architecture design questions.',
    icon: 'briefcase-outline',
    color: '#F59E0B',
  },
];

export const questions = {
  beginner: [
    {
      id: 'b1',
      question: 'What is the difference between JDK, JRE, and JVM?',
      answer: 'JVM (Java Virtual Machine) is an abstract machine that executes Java bytecode.\n\nJRE (Java Runtime Environment) contains JVM + libraries + other components to run applets and applications written in Java.\n\nJDK (Java Development Kit) contains JRE + development tools like compiler (javac), debugger, etc. It is used to develop Java applications.',
      example: 'To compile a Java file, you use "javac" from JDK. To run it, you use "java" from JRE/JDK which invokes the JVM.'
    },
    {
      id: 'b2',
      question: 'Explain the concepts of OOP in Java.',
      answer: 'The core Object-Oriented Programming (OOP) concepts in Java are:\n\n1. Abstraction: Hiding internal details and showing only functionality.\n2. Encapsulation: Wrapping code and data together into a single unit (class).\n3. Inheritance: One object acquires all the properties and behaviors of a parent object.\n4. Polymorphism: Performing a single action in different ways (e.g., method overloading and overriding).',
      example: 'Inheritance Example:\n\nclass Animal {\n  void eat() { System.out.println("eating..."); }\n}\nclass Dog extends Animal {\n  void bark() { System.out.println("barking..."); }\n}\n// Dog inherits eat() from Animal'
    },
    {
      id: 'b3',
      question: 'What is the difference between equals() and == in Java?',
      answer: 'The == operator is used for reference comparison (address comparison). It checks if both objects point to the same memory location.\n\nThe equals() method is used for content comparison. It evaluates to the comparison of values in the objects (if overridden properly).',
      example: 'String s1 = new String("HELLO");\nString s2 = new String("HELLO");\n\nSystem.out.println(s1 == s2); // false (different memory locations)\nSystem.out.println(s1.equals(s2)); // true (same content)'
    }
  ],
  intermediate: [
    {
      id: 'i1',
      question: 'How does HashMap work internally in Java?',
      answer: 'HashMap in Java works on hashing principles. It uses an array of Nodes (or Entry objects) to store data in key-value pairs.\n\nWhen we call put(key, value):\n1. It calculates the hashcode of the key.\n2. It uses the hashcode to find the index (bucket) in the array.\n3. If a collision occurs (same index), it stores the entry as a LinkedList (or a balanced tree if the list gets too long in Java 8+).\n\nWhen we call get(key):\nIt hashes the key, finds the bucket, and traverses the LinkedList/Tree using the equals() method to find the exact match.',
      example: 'Map<String, Integer> map = new HashMap<>();\nmap.put("Java", 1);\nmap.put("Python", 2);\n// "Java".hashCode() decides the bucket index.'
    },
    {
      id: 'i2',
      question: 'What is the difference between fail-fast and fail-safe iterators?',
      answer: 'Fail-Fast iterators immediately throw ConcurrentModificationException if a collection is modified while iterating over it (e.g., ArrayList, HashMap iterators).\n\nFail-Safe iterators don\'t throw any exception if a collection is modified while iterating because they operate on a clone of the collection (e.g., ConcurrentHashMap, CopyOnWriteArrayList iterators).',
      example: 'List<String> list = new ArrayList<>(Arrays.asList("A", "B"));\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n  String val = it.next();\n  if (val.equals("A")) list.add("C"); // Throws ConcurrentModificationException\n}'
    }
  ],
  advanced: [
    {
      id: 'a1',
      question: 'Explain the Java Memory Model (JMM) and how volatile works.',
      answer: 'The Java Memory Model specifies how threads interact through memory. It defines the rules for visibility of variable changes across threads.\n\nThe "volatile" keyword is used to mark a Java variable as "being stored in main memory". This means that every read of a volatile variable will be read from the computer\'s main memory, and not from the CPU cache, ensuring visibility of the most recent written value to all threads.',
      example: 'class SharedObj {\n  // changes to this variable are immediately visible to all threads\n  volatile boolean flag = true;\n}'
    },
    {
      id: 'a2',
      question: 'What are the differences between ReentrantLock and synchronized?',
      answer: '1. ReentrantLock offers extended capabilities like tryLock() (non-blocking lock acquisition), fairness policies (longest waiting thread gets the lock), and interruptible lock waits.\n2. synchronized is a keyword built into the language; ReentrantLock is a class in java.util.concurrent.locks.\n3. In synchronized, lock release is implicit (when block ends). In ReentrantLock, it must be explicitly released in a finally block.',
      example: 'Lock lock = new ReentrantLock();\nlock.lock();\ntry {\n  // critical section\n} finally {\n  lock.unlock(); // Explicit unlock is crucial\n}'
    }
  ],
  experience: [
    {
      id: 'e1',
      question: 'How would you design a scalable URL shortener system?',
      answer: 'A standard system design interview question.\n\nKey Components:\n1. API Gateway: Routes requests.\n2. Application Servers: Handles business logic (generating short URLs, redirection).\n3. Database: Relational (PostgreSQL) for structured mappings or NoSQL (Cassandra) for high scalability.\n4. Cache: Redis or Memcached for fast lookup of popular short URLs.\n\nGenerating Short URL:\nUse a base62 encoding of an auto-incrementing ID from the DB or a distributed ID generator (like Snowflake) to generate unique short 7-character strings.',
      example: 'ID = 125\nBase62(125) = "cb"\nShort URL = domain.com/cb'
    },
    {
      id: 'e2',
      question: 'You notice a memory leak in a production Java application. How do you troubleshoot it?',
      answer: '1. Monitoring: Observe metrics (Prometheus/Grafana) to confirm constant increase in memory usage without garbage collection recovery.\n2. Heap Dump: Trigger a heap dump using tools like jcmd, jmap, or via an APM tool when memory usage is high.\n3. Analysis: Analyze the heap dump using Eclipse MAT (Memory Analyzer Tool) or VisualVM.\n4. Identify Suspects: Look for the "Leak Suspects" report. Find objects with large retained sizes and trace their GC roots.\n5. Common Causes: Unclosed resources, static collections growing infinitely, ThreadLocal variables not being cleaned up.',
      example: 'Command to take heap dump:\njcmd <PID> GC.heap_dump /path/to/dump.hprof'
    }
  ]
};
