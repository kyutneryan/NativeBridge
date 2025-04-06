//
//  MessageModule.swift
//  NativeBridge
//
//  Created by Hayk Kyutneryan on 06.04.25.
//

import Foundation

@objc(MessageModule)
class MessageModule: NSObject {
  
  @objc
  func sendMessage(_ message: String, resolver resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {
    let response = "Received: \(message)"
    resolve(response)
  }
}
