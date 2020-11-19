"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dietaryIcons = exports.mealTimeIcons = exports.dealTypeIcons = void 0;
var dealTypeIcons = [{
  iconInactive: 'food_inactive.png',
  iconActive: 'food_active.png',
  filterType: 'discount',
  subFilter: 'food',
  id: 'deal1'
}, {
  iconInactive: 'drink_inactive.png',
  iconActive: 'drink_active.png',
  filterType: 'discount',
  subFilter: 'drink',
  id: 'deal2'
}];
exports.dealTypeIcons = dealTypeIcons;
var dietaryIcons = [{
  iconInactive: 'vegetarian_inactive.png',
  iconActive: 'vegetarian_active.png',
  filterType: 'dietaryRequirements',
  subFilter: 'vegetarian',
  id: 'diet1'
}, {
  iconInactive: 'vegan_inactive.png',
  iconActive: 'vegan_active.png',
  filterType: 'dietaryRequirements',
  subFilter: 'vegan',
  id: 'diet2'
}, {
  iconInactive: 'halal_inactive.png',
  iconActive: 'halal_active.png',
  filterType: 'dietaryRequirements',
  subFilter: 'halal',
  id: 'diet3'
}, {
  iconInactive: 'gluten_free_inactive.png',
  iconActive: 'gluten_free_active.png',
  filterType: 'dietaryRequirements',
  subFilter: 'glutenfree',
  id: 'diet4'
}, {
  iconInactive: 'dairy_free_inactive.png',
  iconActive: 'dairy_free_active.png',
  filterType: 'dietaryRequirements',
  subFilter: 'dairyfree',
  id: 'diet5'
}];
exports.dietaryIcons = dietaryIcons;
var mealTimeIcons = [{
  iconInactive: 'breakfast_inactive.png',
  iconActive: 'breakfast_active.png',
  filterType: 'sitting',
  subFilter: 'breakfast',
  id: 'time1'
}, {
  iconInactive: 'lunch_inactive.png',
  iconActive: 'lunch_active.png',
  filterType: 'sitting',
  subFilter: 'lunch',
  id: 'time2'
}, {
  iconInactive: 'dinner_inactive.png',
  iconActive: 'dinner_active.png',
  filterType: 'sitting',
  subFilter: 'dinner',
  id: 'time3'
}];
exports.mealTimeIcons = mealTimeIcons;