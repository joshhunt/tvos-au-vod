//
//  AppDelegate.swift
//  tvos-au-vod
//
//  Created by Josh Hunt on 6/12/2015.
//  Copyright © 2015 Josh Hunt. All rights reserved.
//

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

    var window: UIWindow?
    var appController: TVApplicationController?

    static let TVBaseURL = "http://localhost:8123/"
    static let TVBootURL = "\(AppDelegate.TVBaseURL)bundle.js"
    
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        
        window = UIWindow(frame: UIScreen.mainScreen().bounds)
        
        let appControllerContext = TVApplicationControllerContext()
        
        let javascriptUrl = NSURL(string: AppDelegate.TVBootURL)
        appControllerContext.javaScriptApplicationURL = javascriptUrl!
        
        appControllerContext.launchOptions["BASE_URL"] = AppDelegate.TVBaseURL
        
        if let launchOptions = launchOptions as? [String: AnyObject] {
            for (kind, value) in launchOptions {
                appControllerContext.launchOptions[kind] = value
            }
        }
        
        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        
        return true
    }

    func applicationWillResignActive(application: UIApplication) {}
    func applicationDidEnterBackground(application: UIApplication) {}
    func applicationWillEnterForeground(application: UIApplication) {}
    func applicationDidBecomeActive(application: UIApplication) {}
    func applicationWillTerminate(application: UIApplication) {}

}

