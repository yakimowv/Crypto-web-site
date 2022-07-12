const Crypto = require("../models/Crypto");

exports.create = (cryptoData) => Crypto.create(cryptoData);
exports.getAll = () => Crypto.find({});
exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.getOneForGard = (cryptoId) => Crypto.findById(cryptoId);
exports.getOneDetaild = (cryptoId) =>
  Crypto.findById(cryptoId).populate(`owner`);

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.update = (oldCryptoData, newCryptoData) =>
  Crypto.findByIdAndUpdate(oldCryptoData, newCryptoData, {
    runValidators: true,
  });

exports.search = (text, method) =>
  Crypto.find({
    name: { $regex: new RegExp("^" + text.toLowerCase(), "i") },
    method: method,
  }).lean();

exports.buyCrypto = async (cryptoId, userId) => {
  return Crypto.findByIdAndUpdate(
    { _id: cryptoId },
    { $push: { buyCrypto: userId } }
  );
};
