function command(code){
    print("/js " + code);
    if(Vars.net.client()){
        Call.sendChatMessage("/js " + code);
    }else{
        Vars.mods.getScripts().runConsole(code);
    }
}

module.exports = {
    command: command
}