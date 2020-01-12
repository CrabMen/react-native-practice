//
//  RNHeader.h
//  navigator_redux
//
//  Created by 郭强 on 2020/1/12.
//  Copyright © 2020 Facebook. All rights reserved.
//

#ifndef RNHeader_h
#define RNHeader_h
#import <CodePush/CodePush.h>

#ifdef DEBUG
#define RN_DEBUG                (1)
#else
#define RN_DEBUG                (0)
#endif


#define MAC_IP           (@"192.168.1.101") // gq

#define USE_DEVICE              (1)


#if RN_DEBUG

#define JS_LOCATION             ([NSURL URLWithString:(USE_DEVICE?[NSString stringWithFormat:@"http://%@:8081/index.bundle?platform=ios",MAC_IP]:@"http://localhost:8081/index.bundle?platform=ios")])
#else
//codepush的接入点，必须从codepush中接入
#define JS_LOCATION ([CodePush bundleURLForResource:@"main" withExtension:@"jsbundle"])
#endif

#endif /* RNHeader_h */
