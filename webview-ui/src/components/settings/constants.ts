import {
	ProviderName,
	ModelInfo,
	anthropicModels,
	bedrockModels,
	deepSeekModels,
	geminiModels,
	mistralModels,
	openAiNativeModels,
	vertexModels,
	xaiModels,
	groqModels,
	chutesModels,
	liteLlmDefaultModelId, // Added for LiteLLM
} from "@roo/shared/api"

export { REASONING_MODELS, PROMPT_CACHING_MODELS } from "@roo/shared/api"

export { AWS_REGIONS } from "@roo/shared/aws_regions"

export const MODELS_BY_PROVIDER: Partial<Record<ProviderName, Record<string, ModelInfo>>> = {
	anthropic: anthropicModels,
	bedrock: bedrockModels,
	deepseek: deepSeekModels,
	gemini: geminiModels,
	// Entry for LiteLLM
	litellm: {
		[liteLlmDefaultModelId]: {
			// Only include fields defined in ModelInfo schema (src/schemas/index.ts)
			contextWindow: 16384, // Required
			supportsPromptCache: false, // Required
			maxTokens: 4096, // Optional
			inputPrice: 0, // Optional
			outputPrice: 0, // Optional
			supportsImages: false, // Optional
			// 'name', 'label', 'provider', 'id' are not part of ModelInfo type itself.
		} satisfies ModelInfo, // Use 'satisfies' for better type checking than 'as'
	},
	mistral: mistralModels,
	"openai-native": openAiNativeModels,
	vertex: vertexModels,
	xai: xaiModels,
	groq: groqModels,
	chutes: chutesModels,
	// Ensure other providers like lmstudio, ollama, etc., have entries if they support model lists
	// For now, only adding LiteLLM as per the task.
	// If they are free-form input only, they might have empty {} or a default like LiteLLM.
}

export const PROVIDERS = [
	{ value: "openrouter", label: "OpenRouter" },
	{ value: "anthropic", label: "Anthropic" },
	{ value: "gemini", label: "Google Gemini" },
	{ value: "deepseek", label: "DeepSeek" },
	{ value: "openai-native", label: "OpenAI" },
	{ value: "openai", label: "OpenAI Compatible" },
	{ value: "vertex", label: "GCP Vertex AI" },
	{ value: "bedrock", label: "Amazon Bedrock" },
	{ value: "glama", label: "Glama" },
	{ value: "vscode-lm", label: "VS Code LM API" },
	{ value: "litellm", label: "LiteLLM" },
	{ value: "lmstudio", label: "LM Studio" },
	{ value: "mistral", label: "Mistral" },
	{ value: "ollama", label: "Ollama" },
	{ value: "unbound", label: "Unbound" },
	{ value: "requesty", label: "Requesty" },
	{ value: "human-relay", label: "Human Relay" },
	{ value: "xai", label: "xAI (Grok)" },
	{ value: "groq", label: "Groq" },
	{ value: "chutes", label: "Chutes AI" },
].sort((a, b) => a.label.localeCompare(b.label))

export const VERTEX_REGIONS = [
	{ value: "us-east5", label: "us-east5" },
	{ value: "us-central1", label: "us-central1" },
	{ value: "europe-west1", label: "europe-west1" },
	{ value: "europe-west4", label: "europe-west4" },
	{ value: "asia-southeast1", label: "asia-southeast1" },
]
