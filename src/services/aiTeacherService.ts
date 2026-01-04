import { SyllabusService } from './syllabusService';
import { OpenAIService } from './openaiService';

export interface AITeacherResponse {
  message: string;
  mode: 'academic' | 'conversational' | 'fallback';
  confidence: number;
  suggestedQuestions?: string[];
}

export class AITeacherService {
  private static academicKeywords = [
    'explain', 'what is', 'how does', 'define', 'concept', 'theory', 'algorithm',
    'data structure', 'database', 'network', 'programming', 'code', 'function',
    'class', 'method', 'variable', 'loop', 'array', 'list', 'tree', 'graph',
    'sql', 'query', 'table', 'normalization', 'tcp', 'ip', 'osi', 'protocol'
  ];

  private static conversationalTriggers = [
    'hey', 'hi', 'hello', 'how are you', 'stressed', 'tired', 'worried',
    'motivate', 'encourage', 'help me', 'feeling', 'exam', 'test', 'nervous',
    'friend', 'chat', 'talk', 'support', 'advice'
  ];

  private static inappropriateTopics = [
    'medical', 'legal', 'personal information', 'dating', 'politics', 'religion'
  ];

  static async processQuery(query: string, userContext?: { department?: string; semester?: string }): Promise<AITeacherResponse> {
    const lowerQuery = query.toLowerCase().trim();
    
    // Check for inappropriate content
    if (this.isInappropriate(lowerQuery)) {
      return this.getFallbackResponse();
    }

    // Determine response mode
    const isAcademic = this.isAcademicQuery(lowerQuery);
    const isConversational = this.isConversationalQuery(lowerQuery);

    if (isAcademic) {
      return await this.getAcademicResponse(query, userContext);
    } else if (isConversational) {
      return await this.getConversationalResponse(query);
    } else {
      return await this.getGeneralResponse(query);
    }
  }

  private static isAcademicQuery(query: string): boolean {
    return this.academicKeywords.some(keyword => query.includes(keyword)) ||
           SyllabusService.getAvailableSubjects().some(subject => 
             query.includes(subject.toLowerCase())
           );
  }

  private static isConversationalQuery(query: string): boolean {
    return this.conversationalTriggers.some(trigger => query.includes(trigger));
  }

  private static isInappropriate(query: string): boolean {
    return this.inappropriateTopics.some(topic => query.includes(topic));
  }

  private static async getAcademicResponse(query: string, userContext?: { department?: string; semester?: string }): Promise<AITeacherResponse> {
    // Try to get syllabus-based response
    const syllabusResponse = SyllabusService.searchContent(query, userContext?.department);
    
    if (syllabusResponse && !syllabusResponse.includes('Please specify the subject')) {
      // Use OpenAI service to make response more conversational
      const enhancedResponse = await OpenAIService.generateResponse(query, syllabusResponse);
      
      return {
        message: enhancedResponse,
        mode: 'academic',
        confidence: 0.9,
        suggestedQuestions: this.getRelatedQuestions(query)
      };
    }

    // Fallback for academic queries without syllabus match
    const fallbackResponse = await OpenAIService.generateResponse(
      `Academic question without syllabus: ${query}`,
      'No specific syllabus content available'
    );
    
    return {
      message: fallbackResponse + "\n\n💡 **Tip:** Ask your instructor to upload the syllabus for this topic so I can give you more specific help!",
      mode: 'academic',
      confidence: 0.6,
      suggestedQuestions: this.getRelatedQuestions(query)
    };
  }

  private static async getConversationalResponse(query: string): Promise<AITeacherResponse> {
    // Use OpenAI service for natural conversational responses
    const response = await OpenAIService.generateResponse(query);
    
    return {
      message: response,
      mode: 'conversational',
      confidence: 0.9,
      suggestedQuestions: [
        "Can you help me with my coursework?",
        "I'm struggling with a concept",
        "How can I study more effectively?"
      ]
    };
  }

  private static async getGeneralResponse(query: string): Promise<AITeacherResponse> {
    const response = await OpenAIService.generateResponse(query);
    
    return {
      message: response,
      mode: 'conversational',
      confidence: 0.8,
      suggestedQuestions: [
        "What subjects can you help me with?",
        "I need motivation to study",
        "Explain data structures to me"
      ]
    };
  }

  private static getFallbackResponse(): AITeacherResponse {
    return {
      message: `I appreciate you reaching out! 😊 I'm here to help with your academic studies and provide friendly support for your learning journey. 

For other types of questions, I'd recommend:
• Speaking with a counselor for personal matters
• Contacting campus support for non-academic issues
• Using the campus AI assistant for general campus info

What can I help you learn today? 📚`,
      mode: 'fallback',
      confidence: 0.5
    };
  }

  private static makeResponseFriendly(syllabusResponse: string, mode: 'academic' | 'conversational'): string {
    if (mode === 'academic') {
      const friendlyIntros = [
        "Great question! Let me break this down for you 😊\n\n",
        "I'd love to help you understand this! 📚\n\n",
        "Perfect! This is an important concept. Here's what you need to know:\n\n",
        "Excellent question! Let me explain this step by step 🎯\n\n"
      ];
      
      const friendlyOutros = [
        "\n\nDoes this help clarify things? Feel free to ask if you need me to explain any part differently! 😊",
        "\n\nI hope that makes sense! Let me know if you'd like me to dive deeper into any aspect 🤔",
        "\n\nYou're doing great by asking questions! Need any clarification on this topic? 💪",
        "\n\nKeep up the curiosity! Any other aspects of this you'd like to explore? 🌟"
      ];

      const intro = friendlyIntros[Math.floor(Math.random() * friendlyIntros.length)];
      const outro = friendlyOutros[Math.floor(Math.random() * friendlyOutros.length)];
      
      return intro + syllabusResponse + outro;
    }
    
    return syllabusResponse;
  }

  private static getRelatedQuestions(query: string): string[] {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('data structure') || lowerQuery.includes('array') || lowerQuery.includes('list')) {
      return [
        "What's the difference between arrays and linked lists?",
        "How do stacks and queues work?",
        "Can you explain time complexity?"
      ];
    }
    
    if (lowerQuery.includes('database') || lowerQuery.includes('sql')) {
      return [
        "What is database normalization?",
        "How do SQL joins work?",
        "What are ACID properties?"
      ];
    }
    
    if (lowerQuery.includes('network') || lowerQuery.includes('osi')) {
      return [
        "How does the OSI model work?",
        "What's the difference between TCP and UDP?",
        "Can you explain IP addressing?"
      ];
    }
    
    return [
      "Can you give me an example?",
      "How is this used in real applications?",
      "What are the key points to remember?"
    ];
  }
}