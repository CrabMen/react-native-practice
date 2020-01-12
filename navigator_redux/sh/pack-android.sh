#! /bin/bash

rm -rf ./android/app/src/main/assets/index.android.bundle
rm -rf ./android/app/src/main/assets/index.android.bundle.meta

react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/a/
# react-native bundle --platform android --dev false --entry-file AppGZL.js --bundle-output ./android/app/src/main/assets/AppGZL.android.bundle --assets-dest ./android/app/src/main/res/

rm -rf ./android/app/src/main/res/drawable-mdpi/src_images_tabbar_request_loading_icon.gif

# echo 'delete succ, package succ'


#rm -r /android/app/src/main/res/drawable-mdpi/src_images_tabbar_request_loading_icon.gif
# cd android && ./gradlew assembleRelease
# cd android && ./gradlew assembleDebug
