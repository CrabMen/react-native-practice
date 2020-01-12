//
//  RNBridge.m
//  sudaizhijia
//
//  Created by jia fei on 2019/6/29.
//  Copyright © 2019 zhijie. All rights reserved.
//

#import "RNBridge.h"
#import "RNHeader.h"


@implementation RNBridge
    
static RNBridge *defaultHandle = nil;
+ (RNBridge *)shareInstance
{
    @synchronized(self){
          if (defaultHandle == nil) {
              defaultHandle = [[RNBridge alloc] initWithDelegate:[[RNBridgeHandle alloc]init] launchOptions:nil];
              [defaultHandle addObserver:defaultHandle forKeyPath:@"loading" options:NSKeyValueObservingOptionNew context:nil];
        }
    }
    
   return defaultHandle;
}


@end


@implementation RNBridgeHandle
    
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
//    return [CodePush bundleURLForResource:@"main" withExtension:@"jsbundle"];
    return JS_LOCATION;
}
@end
