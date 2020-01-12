#! /bin/bash 

rm -rf ./ios/sudaizhijia/assets 
rm -rf ./ios/main.jsbundle
rm -rf ./ios/main.jsbundle.meta
rm -rf ./ios/sudaizhijia/main.jsbundle
rm -rf ./ios/sudaizhijia/main.jsbundle.meta
# react-native bundle --entry-file AppGZL.js --platform ios --dev false --bundle-output ios/sudaizhijia/AppGZL.jsbundle --assets-dest ios/sudaizhijia/
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/sudaizhijia/main.jsbundle --assets-dest ios/sudaizhijia/
rm -rf ./ios/sudaizhijia/main.jsbundle.meta
