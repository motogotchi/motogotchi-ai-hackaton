import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Json "mo:json";
import LLM "mo:llm";
import Agent "agent";

// User class
persistent actor class User(userPrincipal : Principal, mainPrincipal : Principal) {

  ///////////
  // Types //
  ///////////

  // Log entry type
  public type LogEntry = { createdAt : Time.Time; content : Text };

  // User info type
  public type UserInfo = {
    name : Text;
    height : Text;
    weight : Text;
    goals : Text;
  };

  // Mutable user info type
  private type MutableUserInfo = {
    var name : Text;
    var height : Text;
    var weight : Text;
    var goals : Text;
  };

  ///////////////
  // Variables //
  ///////////////

  // User info
  var userInfo : MutableUserInfo = {
    var name = "";
    var height = "";
    var weight = "";
    var goals = "";
  };

  // User log
  var userLog : [LogEntry] = [];

  // Authorized principals
  private stable var user : Principal = userPrincipal;
  private stable var main : Principal = mainPrincipal;

  // Chat
  var chatHistory : [LLM.ChatMessage] = [];

  ///////////////////////
  // Private Functions //
  ///////////////////////

  // Is authorized
  private func isAuthorized(caller : Principal) : Bool {
    return caller == user or caller == main;
  };

  // Add any message type to chat history
  private func addMessageToHistory(role : LLM.Role, content : Text) {
    chatHistory := Array.append(chatHistory, [{ role = role; content = content }]);
  };

  // Update user info from a JSON object
  private func updateUserInfoFromJson(userInfoJson : Json.Json) {
    switch (Json.getAsText(userInfoJson, "name")) {
      case (#ok(name)) { userInfo.name := name };
      case (_) {};
    };

    switch (Json.getAsText(userInfoJson, "height")) {
      case (#ok(height)) { userInfo.height := height }; // OK now
      case (_) {};
    };

    switch (Json.getAsText(userInfoJson, "weight")) {
      case (#ok(weight)) { userInfo.weight := weight }; // OK now
      case (_) {};
    };

    switch (Json.getAsText(userInfoJson, "goals")) {
      case (#ok(goals)) { userInfo.goals := goals }; // OK now
      case (_) {};
    };
  };

  //////////////////////
  // Public Functions //
  //////////////////////

  // Get the user info.
  public shared query (msg) func getUserInfo() : async UserInfo {
    assert isAuthorized(msg.caller);
    return {
      name = userInfo.name;
      height = userInfo.height;
      weight = userInfo.weight;
      goals = userInfo.goals;
    };
  };

  // Extract user info with LLM and update saved state
  public shared (msg) func setUserInfoWithLLM(message : Text) : async () {
    assert isAuthorized(msg.caller);
    let llmResponse : Text = await Agent.extractUserInfo(message);

    switch (Json.parse(llmResponse)) {
      case (#ok(responseJson)) {
        updateUserInfoFromJson(responseJson);
      };
      case (#err(e)) {
        Debug.print("setUserInfoLLM Parse error: " # debug_show (e));
      };
    };
  };

  // Get the user's activity log.
  public shared query (msg) func getLogs() : async [LogEntry] {
    assert isAuthorized(msg.caller);
    return userLog;
  };

  // Get the user's chat history.
  public shared query (msg) func getChatHistory() : async [LLM.ChatMessage] {
    assert isAuthorized(msg.caller);
    return chatHistory;
  };

  // Send a message to the LLM, including context, and store the conversation.
  public shared (msg) func chat(userMessage : Text) : async Text {
    assert isAuthorized(msg.caller);
    addMessageToHistory(#user, userMessage);

    var messages : [LLM.ChatMessage] = [{
      role = #system_;
      content = "Limit the response to maximum 150 words";
    }];

    messages := Array.append(messages, chatHistory);

    let response : Text = await LLM.chat(
      #Llama3_1_8B,
      chatHistory,
    );

    addMessageToHistory(#assistant, response);
    return response;
  };

  // Send a message to the LLM, including context, and store the conversation.
  public shared (msg) func advice() : async Text {
    assert isAuthorized(msg.caller);

    let llmResponse : Text = await Agent.getAdvice({
      name = userInfo.name;
      height = userInfo.height;
      weight = userInfo.weight;
      goals = userInfo.goals;
    });

    addMessageToHistory(#assistant, llmResponse);
    return llmResponse;
  };

  // Clear the entire chat history for the user.
  public shared (msg) func clearChatHistory() : async () {
    assert isAuthorized(msg.caller);
    chatHistory := [];
  };
};
