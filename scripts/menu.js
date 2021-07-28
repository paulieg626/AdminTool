const vars = require("vars");

function folding(t){
    return t.button("AdminTool", run(() => {d()})).size(140, 40).padTop(5).padRight(5);
}

function folder(table){
    table.table(Styles.black5, cons(t => {
        folding(t);
    }));
    table.fillParent = true;
    table.visibility = () => {
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

function d(){
    //
    const dialog = new BaseDialog("AdminTool");
    dialog.addCloseButton();
    const table = dialog.cont;
    table.add("@admintool.text1");
    table.row();
    table.add("@admintool.text2");
    table.row();
    table.add("@admintool.text3");
    table.row();
    table.add("@admintool.recommended");
    dialog.buttons.button("@admintool.plugin", run(() => {Core.app.openURI("https://github.com/MindustryInside/JSEval");}));
    dialog.show();
}

module.exports = {
    add: folder,
}