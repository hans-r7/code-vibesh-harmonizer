
import { pipeline } from "@huggingface/transformers";

let generator: any = null;

async function initializeGenerator() {
  if (!generator) {
    generator = await pipeline(
      "text-generation",
      "Xenova/code-generator-small",
      { device: "cpu" }
    );
  }
  return generator;
}

export async function generateCode(prompt: string) {
  try {
    const model = await initializeGenerator();
    
    const result = await model(
      `Generate code for: ${prompt}`,
      {
        max_new_tokens: 512,
        temperature: 0.7,
        repetition_penalty: 1.1
      }
    );

    return result[0].generated_text;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}
