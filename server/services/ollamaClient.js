export const generateInsights = async (tenantId, usageData) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      prompt: `
You are an analytics assistant for a SaaS product.

Tenant: ${tenantId}

Usage data:
${JSON.stringify(usageData, null, 2)}

Generate:
1. A short summary of usage behavior
2. One problem
3. One recommendation

Keep it concise and business-friendly.
`,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response;
};
