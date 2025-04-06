//
//  MessageModule.m
//  NativeBridge
//
//  Created by Hayk Kyutneryan on 06.04.25.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MessageModule, NSObject)

RCT_EXTERN_METHOD(sendMessage:(NSString *)message
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
