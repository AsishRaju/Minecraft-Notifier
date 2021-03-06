const { ipcRenderer } = require('electron');


ipcRenderer.on('message-from-notification-worker', (event, arg) => {

    if (arg.command == 'server-status') {

        if (arg.payload.status) {
            document.querySelector('.server-status').innerHTML = "Online"
            document.getElementById('status').style.setProperty('color', 'green', 'important');
        }
        else {
            document.querySelector('.server-status').innerHTML = "Offline"
            document.getElementById('status').style.setProperty('color', 'red', 'important');
            document.querySelector('.players').innerHTML = ""
            document.querySelector('.player-count').innerHTML = 0;
        }

    }
    else if (arg.command == 'players') {

        let players = arg.payload.players;

        document.querySelector('.player-count').innerHTML = players.length;
        document.querySelector('.players').innerHTML = ""
    
        players.forEach(player => {
    
            let diff = new Date() - new Date(player.timestamp);
            let minutes = Math.floor((diff / 1000) / 60);
    
            let stats = '';
    
            if (minutes < 1) {
                stats = 'Just Now';
            }
            else {
                stats = minutes + ' Min';
            }
    
            document.querySelector('.players').innerHTML += '<div class = "card">' + '<p>' + player.name + '</p>' + '<p>' + stats + '</p>' + '</div>';
        });

    }

});