const vars = require("vars");
const m = require("command");

function addBlock(table,b,dialog){
    table.button(new TextureRegionDrawable(Vars.content.blocks().get(b).fullIcon), Styles.clearNonei, 55, run(() => {
        m.command("Groups.player.each(e=>{if(e.id==\""+Vars.player.id+"\"){Vars.world.tileWorld(e.x, e.y).setNet(Vars.content.blocks().get("+b+"),e.team(),0)}})");
            dialog.hide();
    })).size(60);
    if(b % 20 == 19){
        table.row()
    }
}

function folding(t){
    let b = new ImageButton(Icon.terrain, Styles.logici);
    let bs = b.style;
    bs.down = Styles.flatDown;
    bs.over = Styles.flatOver;
    bs.imageDisabledColor = Color.gray;
    bs.imageUpColor = Color.white;
    b.clicked(() => {
        const dialog = new BaseDialog("Блоки");
        const table = dialog.cont;

        let blocks = new Table().center().top();
        var pane = new ScrollPane(blocks, Styles.smallPane);
        pane.setScrollingDisabled(true, false);
        pane.setOverscroll(false, false);
        table.add(pane).size(Core.graphics.getWidth(),Core.graphics.getHeight()-150).top();

        for(var b = 0; b < Vars.content.blocks().size; b++){
            addBlock(blocks,b,dialog);
        };
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
    })).padBottom(65).padLeft(0);
    table.fillParent = true;
    table.visibility = () => {
        if(!vars.folded) return false;
        if(!Vars.ui.hudfrag.shown) return false;
        if(Vars.ui.minimapfrag.shown()) return false;
        if(!Vars.mobile) return true;
        if(Vars.player.unit().isBuilding()) return false;
        if(Vars.control.input.block != null) return false;
        if(Vars.control.input.mode == PlaceMode.breaking) return false;
        //if(!Vars.control.input.selectRequests.isEmpty() && Vars.control.input.lastSchematic != null && !Vars.control.input.selectRequests.isEmpty()) return false;
        return true;
    };
}

module.exports = {
    addFolded: foldedFolder
}