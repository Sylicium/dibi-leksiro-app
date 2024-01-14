'use strict';

const notifier = require('node-notifier');

let _GLOBAL_BACKGROUND = {
    defaultValuesNotifier: {
        title: "Dibi Leksiro",
        appID: "Dibi Leksiro",
        icon: "./application/assets/img/logo.png",
        sound: true
    }
}


let trayIconPath = "./application/assets/img/logo3.png"

var tray = new nw.Tray({
    title: 'Dibi Leksiro',
    icon: trayIconPath,
});

tray.on("click", () => {
    console.log("clicked 2")
    TrayMenu.showApp()
});


nw.Window.get().realClose = nw.Window.get().close

nw.Window.get().on('close', () => {
    TrayMenu.hideApp()
})

class new_TrayMenu {
    constructor() {
        this.notifyOnMinimize = false

    }
    closeApp(...args) {
        nw.Window.get().realClose(...args)
    }
    refreshApp() {
        // document.location.href = "./application/index.html"
        chrome.runtime.reload()
    }
    hideApp() {
        if(this.notifyOnMinimize) {
            notifier.notify({
                title: _GLOBAL_BACKGROUND.defaultValuesNotifier.title,
                message: "L'application s'est minimisée. Cliquez sur l'icone en bas à droite pour la réouvrir.",
                sound: _GLOBAL_BACKGROUND.defaultValuesNotifier.sound, // Enable notification sound
                wait: false, // Don't wait for user action to close the notification
                timeout: false,
                appID: _GLOBAL_BACKGROUND.defaultValuesNotifier.appID,
                icon: _GLOBAL_BACKGROUND.defaultValuesNotifier.icon,
                click: () => { console.log("coucou") }
            }, (error, response, metadata) => {
                if(error) throw error
                console.log("coucou")
                if(response == "activate") {
                    this.showApp()
                }
            });
        }
        
        nw.Window.get().hide()
    }
    showApp() {
        nw.Window.get().show()
    }
}

let TrayMenu = new new_TrayMenu()

// Give it a menu
var menu = new nw.Menu();
/*
Glitching
menu.append(new nw.MenuItem({ type: 'normal', label: 'Resfresh app', click: () => { TrayMenu.refreshApp()} }));
*/
menu.append(new nw.MenuItem({ type: 'checkbox', label: 'App in background on close', checked: true} ));
menu.append(new nw.MenuItem({ type: 'separator', label: 'separator1' }));
menu.append(new nw.MenuItem({ type: 'normal', label: 'Exit', click: () => TrayMenu.closeApp(true) }));
tray.menu = menu;



/*
function showNotification() {
    notifier.notify({
        title: 'Dibi Leksiro',
        message: 'Un nouveau mot a été ajouté !\nAuteur: Sylicium - 03:25',
        sound: false, // Enable notification sound
        wait: false, // Don't wait for user action to close the notification
        reply: true,
        timeout: false,
        icon: "./application/assets/img/icon kaedemi dibial.png"
    });
}

notifier.notify({
            title: 'Dibi Leksiro',
            message: "L'application s'est minimisée. Cliquez sur l'icone en bas à droite pour la réouvrir.",
            sound: false, // Enable notification sound
            wait: false, // Don't wait for user action to close the notification
            timeout: false,
            icon: "./application/assets/img/icon kaedemi dibial.png",
            click: () => { console.log("coucou") }
        }, (error, response, metadata) => {
            if(error) throw error
            console.log("coucou")
            if(response == "activate") {
                this.showApp()
            }
        });

*/