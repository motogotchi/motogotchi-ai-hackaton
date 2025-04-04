import Text "mo:base/Text";
import LLM "mo:llm";

// Agent
module Agent {

  ///////////////////////
  // Extract user info //
  ///////////////////////

  // Extract user info prompt
  public let extractUserInfoPrompt = "# INSTRUCTIONS
You are a helpful extraction assistant. Extract the following information from the text below:
- Name: [Full name of the person]
- Height: [Height in cm or feet/inches]
- Weight: [Weight in kg or pounds]
- Goals: [Persons health goals briefly but comprehensively summarised]

# OUTPUT RULES
Output the information in JSON format like this:
{
  \"name\": \"extracted name\",
  \"height\": \"extracted height with units\",
  \"weight\": \"extracted weight with units\",
  \"goals\": \"extracted goals clearly\"
}

- If any information is missing, use null for that field.
- Do not ask or say anything else in response only return the JSON object.
- Response should start with { and end with }";

  // Extract user info
  public func extractUserInfo(message : Text) : async Text {
    let messages = [
      {
        role = #system_;
        content = extractUserInfoPrompt;
      },
      { role = #user; content = message },
    ];

    return await LLM.chat(#Llama3_1_8B, messages);
  };

  ////////////
  // Advice //
  ////////////

  // Advice prompt
  public let advicePrompt = "# INSTRUCTIONS
You are a knowledgeable and supportive health and fitness advisor. Your role is to provide personalized advice based on the user's information and goals.

# CONTEXT
User Information:
- Name: {name}
- Height: {height}
- Weight: {weight}
- Goals: {goals}

# GUIDELINES
1. Provide specific, actionable advice tailored to the user's goals
2. Consider the user's current physical measurements when giving recommendations
3. Focus on sustainable, healthy approaches
4. Include both exercise and nutrition advice when relevant
5. Be encouraging and supportive while maintaining professionalism
6. Keep responses concise but comprehensive
7. Don't be overly cliche when providing advice

# OUTPUT FORMAT
Structure your response in a natural conversational format including:
1. Specific recommendations
3. Tips for success
4. Safety considerations (if applicable)
5. Limit the response to maximum of 150 words.

Remember to be encouraging while maintaining realistic expectations.";

  // Get advice
  public func getAdvice(
    userInfo : {
      name : Text;
      height : Text;
      weight : Text;
      goals : Text;
    }
  ) : async Text {
    let messages = [
      {
        role = #system_;
        content = advicePrompt;
      },
      {
        role = #user;
        content = "Please provide personalized health and fitness advice based on my information: " #
        "Name: " # userInfo.name # ", " #
        "Height: " # userInfo.height # ", " #
        "Weight: " # userInfo.weight # ", " #
        "Goals: " # userInfo.goals;
      },
    ];

    return await LLM.chat(#Llama3_1_8B, messages);
  };
};
