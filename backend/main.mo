import Bool "mo:base/Bool";
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
  type PriceCategory = {
    #High;
    #Medium;
    #Low;
  };

  type Gem = {
    id: Nat;
    title: Text;
    description: ?Text;
    url: Text;
    upvotes: Nat;
    downvotes: Nat;
    timestamp: Int;
    category: { #Brazil; #Africa };
    color: Text;
    priceCategory: PriceCategory;
    countryOfOrigin: Text;
    imageUrl: ?Text;
  };

  stable var nextGemId: Nat = 0;
  let gems = HashMap.HashMap<Nat, Gem>(10, Int.equal, Int.hash);

  public func addGem(title: Text, description: ?Text, url: Text, category: Text, color: Text, priceCategory: Text, countryOfOrigin: Text, imageUrl: ?Text) : async Result.Result<Nat, Text> {
    let id = nextGemId;
    let gemCategory = switch (category) {
      case ("Brazil") #Brazil;
      case ("Africa") #Africa;
      case (_) return #err("Invalid category");
    };
    let gemPriceCategory = switch (priceCategory) {
      case ("High") #High;
      case ("Medium") #Medium;
      case ("Low") #Low;
      case (_) return #err("Invalid price category");
    };
    let gem: Gem = {
      id;
      title;
      description;
      url;
      upvotes = 0;
      downvotes = 0;
      timestamp = Time.now();
      category = gemCategory;
      color;
      priceCategory = gemPriceCategory;
      countryOfOrigin;
      imageUrl;
    };
    gems.put(id, gem);
    nextGemId += 1;
    #ok(id)
  };

  public query func getGems() : async [Gem] {
    Iter.toArray(gems.vals())
  };

  public query func getGemsByCategory(category: Text) : async [Gem] {
    let gemCategory = switch (category) {
      case ("Brazil") ?#Brazil;
      case ("Africa") ?#Africa;
      case (_) null;
    };
    switch (gemCategory) {
      case (null) [];
      case (?cat) {
        Iter.toArray(Iter.filter(gems.vals(), func (gem: Gem) : Bool { gem.category == cat }))
      };
    }
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
          category = gem.category;
          color = gem.color;
          priceCategory = gem.priceCategory;
          countryOfOrigin = gem.countryOfOrigin;
          imageUrl = gem.imageUrl;
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
          category = gem.category;
          color = gem.color;
          priceCategory = gem.priceCategory;
          countryOfOrigin = gem.countryOfOrigin;
          imageUrl = gem.imageUrl;
        };
        gems.put(id, updatedGem);
        #ok()
      };
    }
  };

  public query func getCategories() : async [Text] {
    ["Brazil", "Africa"]
  };
}
