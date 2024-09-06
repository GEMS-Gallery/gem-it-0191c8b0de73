import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Gem = {
    id: Nat;
    title: Text;
    description: ?Text;
    url: Text;
    upvotes: Nat;
    downvotes: Nat;
    timestamp: Int;
  };

  stable var nextGemId: Nat = 0;
  let gems = HashMap.HashMap<Nat, Gem>(10, Int.equal, Int.hash);

  public func addGem(title: Text, description: ?Text, url: Text) : async Result.Result<Nat, Text> {
    let id = nextGemId;
    let gem: Gem = {
      id;
      title;
      description;
      url;
      upvotes = 0;
      downvotes = 0;
      timestamp = Time.now();
    };
    gems.put(id, gem);
    nextGemId += 1;
    #ok(id)
  };

  public query func getGems() : async [Gem] {
    Iter.toArray(gems.vals())
  };

  public query func getGem(id: Nat) : async ?Gem {
    gems.get(id)
  };

  public func upvoteGem(id: Nat) : async Result.Result<(), Text> {
    switch (gems.get(id)) {
      case (null) { #err("Gem not found") };
      case (?gem) {
        let updatedGem = {
          id = gem.id;
          title = gem.title;
          description = gem.description;
          url = gem.url;
          upvotes = gem.upvotes + 1;
          downvotes = gem.downvotes;
          timestamp = gem.timestamp;
        };
        gems.put(id, updatedGem);
        #ok()
      };
    }
  };

  public func downvoteGem(id: Nat) : async Result.Result<(), Text> {
    switch (gems.get(id)) {
      case (null) { #err("Gem not found") };
      case (?gem) {
        let updatedGem = {
          id = gem.id;
          title = gem.title;
          description = gem.description;
          url = gem.url;
          upvotes = gem.upvotes;
          downvotes = gem.downvotes + 1;
          timestamp = gem.timestamp;
        };
        gems.put(id, updatedGem);
        #ok()
      };
    }
  };
}
