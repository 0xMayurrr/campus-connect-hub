export interface AIResponse {
  message: string;
  type: 'info' | 'routing' | 'faq' | 'facility';
  suggestedActions?: string[];
}

export class CampusAIService {
  private static knowledgeBase = {
    departments: {
      'computer science': 'CS Block, First Floor. Contact: cs@campus.edu',
      'mechanical': 'Mechanical Block, Ground Floor. Contact: mech@campus.edu',
      'electrical': 'EE Block, Second Floor. Contact: ee@campus.edu',
      'library': 'Central Library Building. Hours: 8 AM - 8 PM',
      'admin': 'Main Building, Ground Floor. Hours: 9 AM - 5 PM'
    },
    facilities: {
      'cafeteria': 'Student Center, Ground Floor. Hours: 7 AM - 9 PM',
      'medical': 'Health Center, 24/7 emergency services available',
      'hostel': 'Hostel Complex, Boys: Block A, Girls: Block B',
      'transport': 'Gate Complex, Bus services 6 AM - 10 PM',
      'sports': 'Sports Complex, Indoor/Outdoor facilities available'
    },
    procedures: {
      'complaint': 'Submit through Campus Aid portal → Auto-routed to department → Tracked until resolution',
      'academic query': 'Contact your tutor or use AI Teacher for syllabus questions',
      'hostel issue': 'Contact hostel warden or submit ticket for maintenance',
      'transport': 'Check bus schedules at transport office or submit route requests'
    }
  };

  static processQuery(query: string): AIResponse {
    const lowerQuery = query.toLowerCase();
    
    // Department routing
    for (const [dept, info] of Object.entries(this.knowledgeBase.departments)) {
      if (lowerQuery.includes(dept)) {
        return {
          message: `**${dept.toUpperCase()} Department Information:**\n${info}`,
          type: 'routing',
          suggestedActions: ['Submit Ticket', 'Navigate to Location']
        };
      }
    }

    // Facility information
    for (const [facility, info] of Object.entries(this.knowledgeBase.facilities)) {
      if (lowerQuery.includes(facility)) {
        return {
          message: `**${facility.toUpperCase()} Information:**\n${info}`,
          type: 'facility',
          suggestedActions: ['Get Directions', 'Submit Facility Issue']
        };
      }
    }

    // Procedure guidance
    for (const [procedure, info] of Object.entries(this.knowledgeBase.procedures)) {
      if (lowerQuery.includes(procedure)) {
        return {
          message: `**${procedure.toUpperCase()} Process:**\n${info}`,
          type: 'info',
          suggestedActions: ['Submit Request', 'View Guidelines']
        };
      }
    }

    // General help keywords
    if (lowerQuery.includes('help') || lowerQuery.includes('support')) {
      return {
        message: `**Campus Support Options:**\n• Submit tickets for issues\n• Use AI Teacher for academic help\n• Navigate campus with QR codes\n• Check notices for updates`,
        type: 'info',
        suggestedActions: ['Submit Ticket', 'AI Teacher', 'Campus Navigation']
      };
    }

    if (lowerQuery.includes('contact') || lowerQuery.includes('phone')) {
      return {
        message: `**Emergency Contacts:**\n• Security: 100\n• Medical: 102\n• Admin Office: 0422-123456\n• Hostel Warden: 0422-123457`,
        type: 'info'
      };
    }

    // Default response
    return {
      message: `I can help you with:\n• Department locations and contacts\n• Campus facility information\n• Procedure guidance\n• Emergency contacts\n\nTry asking about specific departments, facilities, or procedures.`,
      type: 'faq',
      suggestedActions: ['Browse Departments', 'View Campus Map', 'Submit Question']
    };
  }

  static getFAQs(): Array<{question: string; answer: string}> {
    return [
      {
        question: "How do I submit a complaint?",
        answer: "Use the 'Submit Request' feature in Campus Aid. Your ticket will be automatically routed to the appropriate department."
      },
      {
        question: "Where is the library located?",
        answer: "Central Library Building, open 8 AM - 8 PM daily. Use campus navigation for directions."
      },
      {
        question: "How do I contact my department?",
        answer: "Each department has contact details available. Ask me about your specific department for contact information."
      },
      {
        question: "What are the hostel rules?",
        answer: "Contact your hostel warden for detailed rules, or submit a query through the ticket system."
      }
    ];
  }
}