var units = Vars.content.units();
var allTeams = Team.all;
var baseTeams = Team.baseTeams;
var folded = false;
var TCOffset =  Core.settings.getBool("mod-time-control-enabled", false) ? 62 : 0;

function getPlayers(){
    return Groups.player;
}

module.exports = {
    units: units,
    folded: folded,
    allTeams: allTeams,
    baseTeams: baseTeams,
    TCOffset: TCOffset
}