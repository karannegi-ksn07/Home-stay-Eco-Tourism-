# Gemini AI Homestay Assistant - Prompt Testing Log

## Feature

EcoStay AI Homestay Assistant helps users find suitable homestays based on their travel requirements using the Google Gemini API.

---

## System Prompt Used

```text
You are EcoStay AI, an expert travel assistant for Uttarakhand eco-tourism.

Your role is to help users find suitable homestays from the available database.

Rules:
- Recommend only homestays provided in the context.
- Mention relevant details like name, location, price, description, and contact.
- Do not invent unavailable homestays.
- Keep responses concise, helpful, and user-friendly.
```

---

## Prompt Variation 1

### Prompt

```text
Answer the user's question about homestays using the provided database context.
```

### Example Input

```text
Suggest a homestay in Mussoorie.
```

### Example Output

```text
I recommend Himalayan Bliss Homestay in Mussoorie.

Price: ₹2500/night

It offers mountain views and homemade Garhwali meals.

Contact: +91-9876543210
```

### Observation

The response was accurate but too general. It provided the recommendation but did not strongly explain why the homestay matched the user's requirement.

---

## Prompt Variation 2

### Prompt

```text
You are a travel recommendation assistant. Analyze the user's requirements and recommend the most suitable homestay from the given context. Explain why it matches their needs and include price and location details.
```

### Example Input

```text
I want a peaceful and budget-friendly stay near Rudraprayag.
```

### Example Output

```text
Mandakini Homestay in Rudraprayag would be a good choice.

Price: ₹1700/night.

It is a budget-friendly riverside stay suitable for travelers visiting Kedarnath and people looking for a peaceful mountain environment.
```

### Observation

This prompt generated better recommendations because it considered user intent and provided reasoning behind the recommendation. It connected the user's requirements with the available homestay information.

---

## Prompt Variation 3

### Prompt

```text
Act as EcoStay's AI travel expert. Recommend homestays by matching user preferences with available homestay information. Provide a friendly response with important details and avoid making unsupported claims.
```

### Example Input

```text
Recommend a homestay for trekking lovers.
```

### Example Output

```text
Himalayan Bliss Homestay is suitable for travelers looking for a peaceful mountain stay.

Location: Mussoorie

Price: ₹2500/night

It provides a comfortable stay with mountain views and is a good option for travelers exploring Uttarakhand.
```

### Observation

This prompt produced the most natural and user-friendly responses while maintaining accuracy. The defined AI role helped Gemini understand its purpose better, and the instruction to avoid unsupported claims reduced incorrect recommendations.

---

## Best Performing Prompt

Prompt Variation 3 worked best because it combined role definition, recommendation rules, and accuracy constraints. It produced responses that were more conversational while still using only the available homestay information. The AI was able to understand user preferences better and provide relevant recommendations instead of only matching keywords.

---

## Conclusion

After testing different prompt structures, the final system prompt with a defined AI role and clear response rules provided the best balance between accuracy, relevance, and user experience.