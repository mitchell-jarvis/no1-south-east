"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.provider = exports.firestore = void 0;

var _app = _interopRequireDefault(require("@firebase/app"));

require("firebase/firestore");

require("firebase/storage");

require("firebase/auth");

require("firebase/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyAMh_LPlNk1c-eF-RpoSCHxSdIF30AXoKM",
  authDomain: "no1southeast.firebaseapp.com",
  databaseURL: "https://no1southeast.firebaseio.com",
  projectId: "no1southeast",
  storageBucket: "no1southeast.appspot.com",
  messagingSenderId: "776369088967",
  appId: "1:776369088967:web:cd46485928ebf25be891e2"
};

_app["default"].initializeApp(firebaseConfig);

var firestore = _app["default"].firestore();

exports.firestore = firestore;
var provider = new _app["default"].auth.GoogleAuthProvider();
exports.provider = provider;
var _default = _app["default"];
exports["default"] = _default;