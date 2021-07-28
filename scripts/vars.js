var units = Vars.content.units();
var playerName = Core.settings.getString("name");
var baseTeams = Team.baseTeams;
var folded = false;
var TCOffset =  Core.settings.getBool("mod-time-control-enabled", false) ? 62 : 0;

function getPlayers(){
    return Groups.player;
}

module.exports = {
    playerName: playerName,
    units: units,
    folded: folded,
    baseTeams: baseTeams,
    TCOffset: TCOffset
}