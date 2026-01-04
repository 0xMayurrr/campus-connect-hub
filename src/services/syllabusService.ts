import { Syllabus } from '@/types';

export interface SyllabusContent {
  topics: string[];
  concepts: string[];
  chapters: { title: string; content: string }[];
}

export class SyllabusService {
  private static syllabusDatabase: Map<string, SyllabusContent> = new Map([
    ['data-structures', {
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hashing'],
      concepts: ['Time Complexity', 'Space Complexity', 'Recursion', 'Dynamic Programming'],
      chapters: [
        { title: 'Introduction to Data Structures', content: 'Basic concepts and importance of data structures in programming.' },
        { title: 'Arrays and Strings', content: 'Linear data structures for storing elements of same type.' },
        { title: 'Linked Lists', content: 'Dynamic data structure with nodes containing data and pointers.' }
      ]
    }],
    ['database-management', {
      topics: ['SQL', 'Normalization', 'Transactions', 'Indexing', 'Query Optimization'],
      concepts: ['ACID Properties', 'Relational Model', 'Entity-Relationship Model'],
      chapters: [
        { title: 'Introduction to DBMS', content: 'Database concepts and management systems.' },
        { title: 'SQL Fundamentals', content: 'Structured Query Language for database operations.' },
        { title: 'Database Design', content: 'Normalization and schema design principles.' }
      ]
    }],
    ['computer-networks', {
      topics: ['OSI Model', 'TCP/IP', 'Routing', 'Network Security', 'Protocols'],
      concepts: ['Packet Switching', 'Network Topology', 'Error Detection'],
      chapters: [
        { title: 'Network Fundamentals', content: 'Basic networking concepts and models.' },
        { title: 'OSI Reference Model', content: 'Seven-layer network architecture model.' },
        { title: 'Internet Protocols', content: 'TCP/IP suite and internet communication.' }
      ]
    }]
  ]);

  static getSyllabusContent(subject: string): SyllabusContent | null {
    const key = subject.toLowerCase().replace(/\s+/g, '-');
    return this.syllabusDatabase.get(key) || null;
  }

  static searchContent(query: string, subject?: string): string {
    const searchTerm = query.toLowerCase();
    
    if (subject) {
      const content = this.getSyllabusContent(subject);
      if (content) {
        // Search in topics
        const matchingTopics = content.topics.filter(topic => 
          topic.toLowerCase().includes(searchTerm)
        );
        
        // Search in chapters
        const matchingChapters = content.chapters.filter(chapter =>
          chapter.title.toLowerCase().includes(searchTerm) ||
          chapter.content.toLowerCase().includes(searchTerm)
        );

        if (matchingTopics.length > 0 || matchingChapters.length > 0) {
          let response = `Based on the ${subject} syllabus:\n\n`;
          
          if (matchingTopics.length > 0) {
            response += `**Related Topics:** ${matchingTopics.join(', ')}\n\n`;
          }
          
          if (matchingChapters.length > 0) {
            response += `**Chapter Information:**\n`;
            matchingChapters.forEach(chapter => {
              response += `• ${chapter.title}: ${chapter.content}\n`;
            });
          }
          
          return response;
        }
      }
    }

    return `I found information related to "${query}" in the syllabus. Please specify the subject for more detailed information, or ensure the syllabus materials have been uploaded by your instructor.`;
  }

  static getAvailableSubjects(): string[] {
    return Array.from(this.syllabusDatabase.keys()).map(key => 
      key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
  }
}