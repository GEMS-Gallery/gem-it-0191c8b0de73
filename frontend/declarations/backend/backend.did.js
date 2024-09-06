export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const GemCategory = IDL.Variant({ 'Africa' : IDL.Null, 'Brazil' : IDL.Null });
  const Gem = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'upvotes' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'timestamp' : IDL.Int,
    'category' : GemCategory,
    'downvotes' : IDL.Nat,
  });
  return IDL.Service({
    'addGem' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'downvoteGem' : IDL.Func([IDL.Nat], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getGem' : IDL.Func([IDL.Nat], [IDL.Opt(Gem)], ['query']),
    'getGems' : IDL.Func([], [IDL.Vec(Gem)], ['query']),
    'getGemsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Gem)], ['query']),
    'upvoteGem' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
