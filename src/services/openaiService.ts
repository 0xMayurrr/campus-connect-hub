// Note: This is a placeholder for OpenAI integration
// In production, you would use the OpenAI API with your key
// For demo purposes, we'll use enhanced rule-based responses

export class OpenAIService {
  private static apiKey = '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';

  static async generateResponse(prompt: string, context?: string): Promise<string> {
    // For demo purposes, return enhanced conversational responses
    // In production, this would call OpenAI API
    
    const systemPrompt = `You are a friendly, supportive AI teacher for college students. 
    You should be warm, encouraging, and helpful. Keep responses campus-appropriate.
    If the question is academic, base your answer on the provided syllabus context.
    If it's conversational, respond like a caring mentor.`;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Enhanced rule-based responses that mimic ChatGPT style
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('hey')) {
      return "Hey there! 😊 I'm so glad you're here! I'm your AI teacher and I'm excited to help you learn and grow. Whether you have academic questions or just want to chat about your studies, I'm here for you. What's on your mind today?";
    }
    
    if (lowerPrompt.includes('stressed') || lowerPrompt.includes('overwhelmed')) {
      return "I totally get that feeling! 💙 College can be really overwhelming sometimes, and it's completely normal to feel stressed. You're definitely not alone in this. Remember, you're stronger than you think and you've overcome challenges before. Want to talk about what's specifically stressing you out? Sometimes just talking through it can help, and I'm here to listen and support you! 🤗";
    }
    
    if (lowerPrompt.includes('motivate') || lowerPrompt.includes('motivation')) {
      return "You know what? I'm genuinely proud of you for being here and asking for help! 🌟 That takes courage and shows you care about your growth. Every single day you choose to learn something new, you're becoming a better version of yourself. Your future self will thank you for not giving up today. You've got incredible potential, and I believe in you 100%! What's one small step you can take right now toward your goals? 💪✨";
    }
    
    if (context && (lowerPrompt.includes('explain') || lowerPrompt.includes('what is'))) {
      return `Great question! I love that you're curious about this topic! 😊\n\nBased on your syllabus materials:\n${context}\n\nI hope that helps clarify things! Learning is all about asking good questions like this one. Feel free to ask me to explain any part differently or dive deeper into specific aspects. You're doing awesome by staying curious! 🎯`;
    }
    
    // Default friendly response
    return "That's an interesting question! 😊 I want to make sure I give you the most helpful answer possible. Could you tell me a bit more about what you're looking for? I'm here to help with your coursework, provide study support, or just chat if you need some encouragement. What would be most helpful for you right now? 💭";
  }

  static async isAcademicQuery(query: string): Promise<boolean> {
    const academicIndicators = [
      'explain', 'what is', 'how does', 'define', 'concept', 'theory',
      'algorithm', 'function', 'method', 'class', 'variable', 'data structure'
    ];
    
    return academicIndicators.some(indicator => 
      query.toLowerCase().includes(indicator)
    );
  }
}