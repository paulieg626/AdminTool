function command(code){
    if(Vars.net.client()){
        print("online: /js " + code);
        Call.sendChatMessage("/js " + code);
    }else{
        print("offline: /js " + code);
        Vars.mods.getScripts().runConsole(code);
    }
}

module.exports = {
    command: command
}