#! /bin/bash 


# rm -rf ./ios/sudaizhijia/assets 
# rm -rf ./ios/main.jsbundle
# rm -rf ./ios/main.jsbundle.meta


# if [ ! -d bundle/Android ];then
#   mkdir bundle;
#   cd bundle;
#   mkdir Android;
#   cd ../
# else
#   echo bundle exist
# fi
# react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ./bundle/Android/main.jsbundle --assets-dest ./bundle/Android/ ;

# code-push release-react SDZJRN-Android android  --t 3.3.0 --dev false --d Staging --des "test Android,\n1.test1,\n2.test2,\n3.test,\n4.test" --m true
#code-push release-react SDZJRN-Android android  --t 3.3.0 --dev false --d Production --des "test Android,\n1.test1,\n2.test2,\n3.test,\n4.test" --m true



#code-push deployment history SDZJRN-Android Staging
#code-push deployment history SDZJRN-Android Production

# / 应用信息相关
# code-push deployment add <appName> 部署
# code-push deployment rm <appName> 删除部署
# code-push deployment rename <appName> 重命名
# code-push deployment ls <appName> 列出应用的部署情况
# code-push deployment ls <appName> -k 查看部署的key
# code-push deployment history <appName> <deploymentName> 查看历史版本
# code-push deployment clear SDZJRN-Android Production


                
# code-push app add navigator_redux_ios ios react-native    # 生成新的应用




# =========================================================================================================================================================
# 2019-10-25 热更新
# code-push release-react SDZJRN-Android android  --t 3.3.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 速贷之家                  x
# code-push release-react android_jieqian360-Android android  --t 1.4.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借钱360      x
# code-push release-react daikuanqianbao-Android android  --t 1.2.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 贷款钱包
# code-push release-react daikuan360jieqian-Android android  --t 1.1.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 贷款360借钱
# code-push release-react android_sudai360-Android android  --t 1.3.6 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 速贷360        x
# code-push release-react jiekuanxia-Android android  --t 1.0.7 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借款侠
# code-push release-react shadow_jieqianbao-Android android  --t 1.5.7 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借钱宝
# code-push release-react jiekuanfei-Android android  --t 1.0.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借款飞 
# code-push release-react paipaijiekuan-Android android  --t 1.0.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 拍拍借款
# code-push release-react jisuloan-Android android  --t 1.3.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 极速贷款              x
# code-push release-react kingloan-Android android  --t 1.4.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借钱王借款
# code-push release-react boluodai-Android android  --t 1.0.7 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 菠萝贷
# code-push release-react paipaijieqian-Android android  --t 1.0.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 拍拍借钱
# code-push release-react xianjindaikuan-Android android  --t 1.3.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 现金贷款
# code-push release-react xiaohuaxinyongqianbao-Android android  --t 1.0.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 小花信用钱包
# code-push release-react xianjinfenqihuabai-Android android  --t 1.0.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 现金分期花呗 
# code-push release-react xianjinfenqidai-Android android  --t 1.0.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 现金分期贷 
# code-push release-react kingloan-Android android  --t 1.4.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借钱王借款
# code-push release-react mobileloan-Android android  --t 1.4.0 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 手机贷款	      x
# code-push release-react creditloan-Android android  --t 1.0.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 网上贷款	
# code-push release-react xinyongbaitiao-Android android  --t 1.4.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 信用白条贷款	
# code-push release-react xianjindaikuan-Android android  --t 1.3.4 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 现金贷款花	
# code-push release-react jieqianhua-Android android  --t 1.0.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借钱花	     x
# code-push release-react fenqiloan-Android android  --t 1.3.1 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 分期贷款	
# code-push release-react jiekuanduo-Android android  --t 1.0.3 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借款多	
# code-push release-react jiehuahuadaikuanloan-Android android  --t 1.0.1 --dev false --d Production --des "1.增加活动位，展示更多优质活动。" --m false  # 借花花贷款借钱	
