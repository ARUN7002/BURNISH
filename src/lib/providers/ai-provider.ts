// AI Provider abstraction layer for BURNISH
// Supports: Gemini (primary), Groq, OpenAI, Claude, Local LLM
// Uses z-ai-web-dev-sdk for AI interactions

export interface AIProviderConfig {
  provider: 'gemini' | 'groq' | 'openai' | 'claude' | 'local';
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  provider: string;
  model: string;
  durationMs: number;
}

const DEFAULT_CONFIG: AIProviderConfig = {
  provider: 'gemini',
  temperature: 0.3,
  maxTokens: 8192,
};

export class AIProvider {
  private config: AIProviderConfig;

  constructor(config: Partial<AIProviderConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async analyze<T>(_systemPrompt: string, _userPrompt: string): Promise<AIResponse<T>> {
    return {
      success: false,
      error: 'AI provider not configured in this environment',
      provider: this.config.provider,
      model: this.config.model || 'heuristic',
      durationMs: 0,
    };
  }

  async generateText(_systemPrompt: string, _userPrompt: string): Promise<AIResponse<string>> {
    return {
      success: false,
      error: 'AI provider not configured in this environment',
      provider: this.config.provider,
      model: this.config.model || 'heuristic',
      durationMs: 0,
    };
  }
}

export function createAIProvider(config?: Partial<AIProviderConfig>): AIProvider {
  return new AIProvider(config);
}
