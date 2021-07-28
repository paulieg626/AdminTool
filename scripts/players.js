const vars = require("vars");
const m = require("command");

function addUnit(table,b,dialog){
    let player = new Table().left();
    table.button(new TextureRegionDrawable(Groups.player.index(b).icon()), Styles.clearFulli, 30, run(() => {})).size(40);
    player.add(Groups.player.index(b).name,parseFloat(0.7)).size(200,40).pad(10)
    player.add("[blue]id:"+Groups.player.index(b).id,parseFloat(0.7)).size(60,40).pad(10)
    player.add("[red]"+parseInt(Groups.player.index(b).unit().health).toString(),parseFloat(0.7)).size(100,40).pad(10);
    table.add(player);
    let bi = new ImageButton(new TextureRegionDrawable(Core.atlas.find("admintool-square")), Styles.logici)
    bi.getImageCell().size(40);;
    bi.clicked(() => {//Team
        
    });
    bi.style.imageUpColor = Groups.player.index(b).team().color;
    player.add(bi).size(40);
    let bi2 = new ImageButton(Icon.trash, Styles.logici)
    bi2.style.imageUpColor = Color.white;
    bi2.clicked(() => {//Kill
        m.command("Groups.player.each(e => {if(e.name==\""+Groups.player.index(b).name+"\"){e.unit().kill()}})");
        dialog.hide();
    });
    player.add(bi2).size(40);
    table.row();
}

function folding(t){
    let b = new ImageButton(Icon.players , Styles.logici);
    let bs = b.style;
    bs.down = Styles.flatDown;
    bs.over = Styles.flatOver;
    bs.imageDisabledColor = Color.gray;
    bs.imageUpColor = Color.white;
    b.clicked(() => {
        const dialog = new BaseDialog("Игроки");
        const table = dialog.cont;
        table.left().top();
        let players = new Table().left().top();
        var pane = new ScrollPane(players, Styles.smallPane);
        pane.setScrollingDisabled(true, false);
        pane.setOverscroll(false, false);
        table.add(pane).size(Core.graphics.getWidth(),Core.graphics.getHeight()-150).top();
        for(var b = 0; b < Groups.player.size(); b++){
            addUnit(players,b,dialog);
        };
        dialog.buttons.button(vars.playerName, run(() => {})).size(190,50);
        dialog.buttons.row();
        dialog.buttons.button("Закрыть", run(() => {dialog.hide();})).size(190,50);
        dialog.show();
    });

    return t.add(b).size(40, 40).pad(0).left();
}

function foldedFolder(table){
    table.table(Styles.black5, cons(t => {
        t.background(Tex.buttonEdge3);
        folding(t);
    })).padBottom(vars.TCOffset).padLeft(130);
    table.fillParent = true;
    table.visibility = () => {
        if(!vars.folded) return false;
        if(!Vars.ui.hudfrag.shown) return false;
        if(Vars.ui.minimapfrag.shown()) return false;
        if(!Vars.mobile) return true;
        if(Vars.player.unit().isBuilding()) return false;
        if(Vars.control.input.block != null) return false;
        if(Vars.control.input.mode == PlaceMode.breaking) return false;
        if(!Vars.control.input.selectRequests.isEmpty() && Vars.control.input.lastSchematic != null && !Vars.control.input.selectRequests.isEmpty()) return false;
        return true;
    };
}

module.exports = {
    addFolded: foldedFolder
}