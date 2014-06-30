
var Pedra = cc.Sprite.extend({
    _numero:null,
    _cor:null,
    tabuleiro:null,
    linha:null,
    coluna:null,
    getLinha: function() {

        return this.linha;
    },
    getColuna: function() {
        return this.coluna;
    },
    setNumero:function(numero) {
        this._numero = numero;
    },
    getNumero:function() {
        return this._numero;
    },
    setCor:function(cor) {
        this._cor = cor;
    },
    getCor:function() {
        return this._cor;
    },
    azul:function(numero, linha, coluna) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("azul");

        pedra.linha = linha;
        pedra.coluna = coluna;
        bg = cc.Sprite.create(res.pedra_azul_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);


        labelNumero = cc.LabelTTF.create(numero + "", "Arial", 60);
        labelNumero.x = 60;
        labelNumero.y = 60;
        bg.addChild(labelNumero);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {


                var target = event.getCurrentTarget();
                if (target.getParent().getParent().aguardarComputador) {
                    return false;
                }

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    var pedras = target.getParent().getParent().getPedras();


                    for (i = 0; i < pedras.length; i++) {
                        for (j = 0; j < pedras[i].length; j++) {
                            var pedra = pedras[i][j];
                            if (pedra != null) {
                                pedra.getChildren()[0].opacity = 255;

                            }
                        }
                    }
                    target.opacity = 120;
                    target.getParent().getParent().pedraSelecionada = target.getParent();
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {


            },
            onTouchEnded: function (touch, event) {

            }
        });
        cc.eventManager.addListener(listener1, bg);

        return pedra;
    },
    laranja:function(numero, linha, coluna) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("laranja");
        pedra.linha = linha;
        pedra.coluna = coluna;
        bg = cc.Sprite.create(res.pedra_laranja_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);

        labelNumero = cc.LabelTTF.create(numero + "", "Arial", 60);
        labelNumero.x = 60;
        labelNumero.y = 60;
        bg.addChild(labelNumero);

        return pedra;
    }
});