/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        
        /* Invoke sync with the custom options, which enables user interaction.
           For customizing the sync behavior, see SyncOptions in the CodePush documentation. */
        window.codePush.sync(
            function (syncStatus) {
                switch (syncStatus) {
                    // Result (final) statuses
                    case SyncStatus.UPDATE_INSTALLED:
                        app.displayMessage("The update was installed successfully. For InstallMode.ON_NEXT_RESTART, the changes will be visible after application restart. ");
                        break;
                    case SyncStatus.UP_TO_DATE:
                        app.displayMessage("The application is up to date.");
                        break;
                    case SyncStatus.UPDATE_IGNORED:
                        app.displayMessage("The user decided not to install the optional update.");
                        break;
                    case SyncStatus.ERROR:
                        app.displayMessage("An error occured while checking for updates");
                        break;
                    
                    // Intermediate (non final) statuses
                    case SyncStatus.CHECKING_FOR_UPDATE:
                        console.log("Checking for update.");
                        break;
                    case SyncStatus.AWAITING_USER_ACTION:
                        console.log("Alerting user.");
                        break;
                    case SyncStatus.DOWNLOADING_PACKAGE:
                        console.log("Downloading package.");
                        break;
                    case SyncStatus.INSTALLING_UPDATE:
                        console.log("Installing update");
                        break;
                }
            },
            {
                installMode: InstallMode.ON_NEXT_RESTART, updateDialog: true
            },
            function (downloadProgress) {
                console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
            });
            
        // continue application initialization
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Displays an alert dialog containing a message.
    displayMessage: function (message) {
        navigator.notification.alert(
            message,
            null,
            'CodePush',
            'OK');
    }
};

app.initialize();