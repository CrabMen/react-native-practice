//
//  RNBridge.h
//  sudaizhijia
//
//  Created by jia fei on 2019/6/29.
//  Copyright © 2019 zhijie. All rights reserved.
//

#import <React/RCTBridgeDelegate.h>
#import <React/RCTBridge.h>

@interface RNBridge : RCTBridge
    
+ (RNBridge *)shareInstance;
    
@end

@interface RNBridgeHandle : NSObject<RCTBridgeDelegate>
    
@end
