const vars = require("vars");
const folder = require("folder");
const unit = require("unit");
const units = require("units");
const team = require("team");
const players = require("players");
const blocks = require("blocks");
const menu = require("menu");

var mod = Vars.mods.locateMod("admintool");
mod.meta.displayName = "[red]Admin[orange]Tool";
mod.meta.author = "[#ff0][#fff]paulieg626";
mod.meta.description = "Для работы на сервере нужен плагин: [cyan]https://github.com/MindustryInside/JSEval[]\nи админка"

function addM(source, t){
    source.add(t);
    Vars.ui.menuGroup.addChild(t);
}

function add(source, t){
    source.add(t);
    Vars.ui.hudGroup.addChild(t);
}

function addFolded(source, t){
    source.addFolded(t);
    Vars.ui.hudGroup.addChild(t);
}

if(!Vars.headless){
    let fold = new Table().bottom().left();
    let fFold = new Table().bottom().left();
    let unitf = new Table().bottom().left();
    let unitsf = new Table().bottom().left();
    let teamf = new Table().bottom().left();
    let playersf = new Table().bottom().left();
    let blocksf = new Table().bottom().left();
    let menuf = new Table().top().right();

    Events.on(ClientLoadEvent, () => {
            addM(menu,menuf)
            add(folder, fold);
            addFolded(folder, fFold);
            addFolded(unit, unitf);
            addFolded(units, unitsf);
            addFolded(team, teamf);
            addFolded(players, playersf);
            addFolded(blocks, blocksf);
        }
    );
}

print(Object.keys(Fx).length)
var effects = "";
for(var i in Object.keys(Fx)){
    if(i==0){effects="{"}
    effects = effects + "\""+Object.keys(Fx)[i]+"\""
    if(i==Object.keys(Fx).length-1){
        effects=effects+"}"
    }else{
        effects=effects+","
    }
}
print(effects)