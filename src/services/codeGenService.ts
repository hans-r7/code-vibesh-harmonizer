
export async function generateCode(prompt: string) {
  try {
    const response = await fetch('/api/generate-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate code');
    }

    const data = await response.json();
    return data.code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}
