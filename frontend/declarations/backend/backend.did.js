export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const PriceCategory = IDL.Variant({
    'Low' : IDL.Null,
    'High' : IDL.Null,
    'Medium' : IDL.Null,
  });
  const Gem = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'upvotes' : IDL.Nat,
    'title' : IDL.Text,
    'color' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'imageUrl' : IDL.Opt(IDL.Text),
    'countryOfOrigin' : IDL.Text,
    'nftId' : IDL.Opt(IDL.Nat),
    'timestamp' : IDL.Int,
    'category' : IDL.Variant({ 'Africa' : IDL.Null, 'Brazil' : IDL.Null }),
    'downvotes' : IDL.Nat,
    'priceCategory' : PriceCategory,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Metadata = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'image' : IDL.Opt(IDL.Text),
  });
  const NFT = IDL.Record({
    'id' : IDL.Nat,
    'owner' : Account,
    'metadata' : Metadata,
  });
  return IDL.Service({
    'addGem' : IDL.Func(
        [
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Text),
        ],
        [Result_1],
        [],
      ),
    'createNFT' : IDL.Func([IDL.Nat], [Result_1], []),
    'downvoteGem' : IDL.Func([IDL.Nat], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getGem' : IDL.Func([IDL.Nat], [IDL.Opt(Gem)], ['query']),
    'getGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'getGemsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Gem)], ['query']),
    'getNFT' : IDL.Func([IDL.Nat], [IDL.Opt(NFT)], ['query']),
    'upvoteGem' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
