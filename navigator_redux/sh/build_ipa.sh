#!/bin/bash
projectName="sudaizhijia"
# starttime=`date +'%Y-%m-%d %H:%M:%S'`
commitLog=

# 循环检测输入的文件夹
checkInputDestDirRecursive() {
	echo -n "请更新内容: "
	read commitLog
	if [[ -z "$commitLog" ]]; then
		echo -n "输入内容为空"
        checkInputDestDirRecursive
	fi
}

checkInputDestDirRecursive

echo "更新内容为: $commitLog"
echo "开始打包"

cd ios
rm -rf build/*
# clean project 

#xcodebuild clean -workspace $projectName.xcworkspace -configuration Release -alltargets

# make archive 
xcodebuild archive -workspace $projectName.xcworkspace -scheme $projectName -archivePath build/$projectName.xcarchive
# export .ipa
xcrun xcodebuild -exportArchive -archivePath build/$projectName.xcarchive -exportPath build -exportOptionsPlist ExportOptions.plist
# notice: 需要替换上述MYAPP为自己的应用名。
# export LANG=en_US
# export LC_ALL=en_US;

path="$(pwd)/build/$projectName.ipa"
echo $path

echo "正在上传到fir.im...."

# ######http://fir.im/api/v2/app/appID?token=APIToken，里面的appID是你要上传应用的appID，APIToken是你fir上的APIToken
fir login 135853d06a79637448e333ed46874059
fir p $path -c="$commitLog" -Q

echo "######### 打包上传更新成功！############"

# #rm -rf $buildAppToDir
# #rm -rf $projectDir/tmp

# # endtime=`date +'%Y-%m-%d %H:%M:%S'`
# # start_seconds=$(date --date="$starttime" +%s);
# # end_seconds=$(date --date="$endtime" +%s);
# # echo "本次打包运行时间： "$((end_seconds-start_seconds))"s"
