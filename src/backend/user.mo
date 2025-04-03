import Principal "mo:base/Principal";

// User class
persistent actor class User(userPrincipal : Principal, mainPrincipal : Principal) {
  // Authorized principals
  private stable var user : Principal = userPrincipal;
  private stable var main : Principal = mainPrincipal;

  // Is authorized
  // private func isAuthorized(caller : Principal) : Bool {
  //   return caller == user or caller == main;
  // };

  // Get the user information
  public shared query func getInfo() : async Text {
    // assert isAuthorized(msg.caller);
    return "user: " # Principal.toText(user) # " \nmain: " # Principal.toText(main);
  };
};
