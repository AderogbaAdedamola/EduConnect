/**
 * Parses the structured text response from the AI assistant into a form-compatible object.
 * 
 * Expected format:
 * TITLE: [title]
 * DESCRIPTION: [description]
 * QUESTIONS:
 * 1. [question]
 *    Type: [type]
 *    Options: A) ... B) ...
 *    Correct answer: ...
 */
export function parseAIResponse(text) {
  const result = {
    title: '',
    description: '',
    questions: []
  };

  if (!text) return result;

  // Extract Title
  const titleMatch = text.match(/TITLE:\s*(.*)/i);
  if (titleMatch) result.title = titleMatch[1].trim();

  // Extract Description
  const descMatch = text.match(/DESCRIPTION:\s*(.*)/i);
  if (descMatch) result.description = descMatch[1].trim();

  // Extract Questions block
  const questionsPart = text.split(/QUESTIONS:/i)[1];
  if (!questionsPart) return result;

  // Split by number patterns like "1. ", "2. "
  const questionBlocks = questionsPart.split(/\n\s*\d+\.\s+/).filter(block => block.trim());

  result.questions = questionBlocks.map((block, index) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    const questionText = lines[0] || '';
    
    const typeLine = lines.find(l => l.toLowerCase().startsWith('type:'));
    const rawType = typeLine ? typeLine.split(':')[1]?.trim().toLowerCase() : 'short';
    
    // Map AI types to EduConnect types
    // AI types: short, paragraph, mcq, checkbox, dropdown
    // EduConnect types: 'Short Answer', 'Paragraph', 'Multiple Choice', 'Checkboxes', 'Dropdown'
    let type = 'Short Answer';
    if (rawType.includes('paragraph')) type = 'Paragraph';
    else if (rawType.includes('mcq') || rawType.includes('multiple choice')) type = 'Multiple Choice';
    else if (rawType.includes('checkbox')) type = 'Checkboxes';
    else if (rawType.includes('dropdown')) type = 'Dropdown';

    const optionsLine = lines.find(l => l.toLowerCase().startsWith('options:'));
    let options = [];
    if (optionsLine) {
      // Split by A), B), etc.
      const optionsContent = optionsLine.split(':')[1]?.trim();
      if (optionsContent) {
        options = optionsContent.split(/\s*[A-Z]\)\s*/).filter(o => o.trim());
      }
    }

    const correctLine = lines.find(l => l.toLowerCase().startsWith('correct answer:'));
    const correctAnswerText = correctLine ? correctLine.split(':')[1]?.trim() : '';

    return {
      id: Date.now() + index,
      question: questionText,
      type: type,
      required: true,
      options: options.length > 0 ? options : (['Multiple Choice', 'Checkboxes', 'Dropdown'].includes(type) ? ['Option 1'] : []),
      correctAnswer: correctAnswerText, // For MCQs, we'll need to match this to an option index later if needed
      points: 10
    };
  });

  return result;
}
