import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const service = {
    createImage: ({ prompt, ...options }: OpenAI.Images.ImageGenerateParams) => openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        ...options,
    }),
    createChatCompletion: (options: Omit<OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming, 'model'>) => openai.chat.completions.create({
        model: 'gpt-4',
        ...options,
    }),
};

export default service;
