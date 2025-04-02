import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Map "mo:map/Map";

// Main Canister
persistent actor Main {

  // Map of users <-> canisters principals
  private stable var stableUsersMap : [(Principal, Principal)] = [];
  private var usersMap = Map.fromIter<Principal, Principal>(stableUsersMap.vals(), Map.phash);

  // Pre upgrade hook
  system func preupgrade() {
    let userEntries = Map.entries(usersMap);
    stableUsersMap := Iter.toArray(userEntries);
  };

  // Post upgrade hook
  system func postupgrade() {
    usersMap := Map.fromIter<Principal, Principal>(stableUsersMap.vals(), Map.phash);
  };

  //////////////////////
  // Public Functions //
  //////////////////////

  // Get all user canisters
  public query func getAllUserCanisters() : async [(Principal, Principal)] {
    let userEntries = Map.entries(usersMap);
    return Iter.toArray(userEntries);
  };

};
