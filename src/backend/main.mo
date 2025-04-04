import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Map "mo:map/Map";
import User "user";

// Main Canister
persistent actor Main {

  ///////////////
  // Variables //
  ///////////////

  // Users & their canisters
  private stable var stableSavedAccounts : [(Principal, Principal)] = [];
  private var savedAccounts = Map.fromIter<Principal, Principal>(stableSavedAccounts.vals(), Map.phash);

  // Pre upgrade hook
  system func preupgrade() {
    stableSavedAccounts := Iter.toArray(Map.entries(savedAccounts));
  };

  // Post upgrade hook
  system func postupgrade() {
    savedAccounts := Map.fromIter<Principal, Principal>(stableSavedAccounts.vals(), Map.phash);
  };

  //////////////////////
  // Public Functions //
  //////////////////////

  // Get all user canisters
  public query func getAllAccounts() : async [(Principal, Principal)] {
    return Iter.toArray(Map.entries(savedAccounts));
  };

  // Get user canister by user principal
  public func getUserCanister(userPrincipal : Principal) : async ?Principal {
    return Map.get(savedAccounts, Map.phash, userPrincipal);
  };

  // Delete user canister by user principal
  public func deleteAccount(userPrincipal : Principal) : async () {
    ignore Map.remove(savedAccounts, Map.phash, userPrincipal);
  };

  // Create canister and save an account
  public func createAccount(userPrincipal : Principal) : async Principal {
    let canisterPrincipalOpt = Map.get(savedAccounts, Map.phash, userPrincipal);

    switch canisterPrincipalOpt {
      case (?canisterPrincipal) {
        return canisterPrincipal;
      };

      case (_) {
        let newCanister = await (with cycles = 100_000_000_000) User.User(userPrincipal, Principal.fromActor(Main));
        let newCanisterPrincipal = Principal.fromActor(newCanister);
        Map.set(savedAccounts, Map.phash, userPrincipal, newCanisterPrincipal);
        return newCanisterPrincipal;
      };
    };
  };

};
