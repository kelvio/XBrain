
var EntradaNomeVsJogadorScene = cc.Scene.extend({
    _operacao:null,
    _opcao:null,
    criarTecla:function(simbolo, callback) {

        var tecla = cc.Sprite.create(res.bg_tecla_png);
        var label = cc.LabelTTF.create(simbolo, "Arial", 130);
        label.attr({ x:80, y:80 });
        tecla.addChild(label);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {


                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    callback();
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(listener1, tecla);

        return tecla;

    },
    criarTeclaBackspace:function(callback) {


        var tecla = cc.Sprite.create(res.backspace_png);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {


                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    callback();
                    return true;
                }
                return false;
            }
        });

        cc.eventManager.addListener(listener1, tecla);

        return tecla;

    },
    setOpcao:function(opcao) {
        this._opcao = opcao;
    },
    setOperacao:function(operacao) {
        this._operacao = operacao;
    },
    atualizarLabelNome:function() {
        this.removeChild(this.labelNome);
        var size = cc.director.getWinSize();
        this.labelNome = cc.LabelTTF.create(this.nome, "Arial", 90);
        this.labelNome.x = size.width / 2;
        this.labelNome.y = size.height / 2 + 320;
        this.labelNome.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelNome);
    },
    nome:"",
    labelNome:null,
    onEnter:function () {
        this._super();
        var size = cc.director.getWinSize();
        var outer = this;


        var bg = cc.Sprite.create(res.fundo_azul_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale:1.0
        });
        this.addChild(bg);

        var itemVoltar = cc.MenuItemImage.create(
            res.voltar_branco_png,
            res.voltar_branco_png,
            function() {

                cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2 - 200,
            y: size.height / 2 - 395,
            scale: 0.5
        });


        var itemOk = cc.MenuItemImage.create(
            res.comecar_branco_png,
            res.comecar_branco_png,
            function() {

                if (outer.nome.length == 0) {
                    return;
                }

                var layer = cc.Layer.create();
                //BG
                var bgSprite = cc.Sprite.create(res.fundo_azul_png);
                bgSprite.attr({
                    x: size.width / 2,
                    y: size.height / 2,
                    scale: 1.0
                });

                var itemInterativo = cc.MenuItemImage.create(
                    res.modo_interativo_png,
                    res.modo_interativo_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        var scene = new SelecaoOponenteScene();
                        scene.modo = "interativo";

                        if (outer._operacao == "soma") {
                            scene.operacao = "soma";
                        } else if (outer._operacao == "subtracao") {
                            scene.operacao = "subtracao";
                        } else if (outer._operacao == "multiplicacao") {
                            scene.operacao = "multiplicacao";
                        } else if (outer._operacao == "divisao") {
                            scene.operacao = "divisao";
                            scene.opcao = this._opcao;
                        }

                        scene.nomeJogador = outer.nome;
                        scene.interativo = true;

                        cc.director.runScene(cc.TransitionFade.create(0.5, scene));
                    },
                    this
                );
                itemInterativo.attr({
                    x: size.width / 2,
                    y: size.height / 2 + 150,
                    scale: 1.0
                });

                var itemAutomatico = cc.MenuItemImage.create(
                    res.modo_automatico_png,
                    res.modo_automatico_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        var scene = new SelecaoOponenteScene();
                        scene.modo = "automatico";
                        if (outer._operacao == "soma") {
                            scene.operacao = "+";
                        } else if (outer._operacao == "subtracao") {
                            scene.operacao = "-";
                        } else if (outer._operacao == "multiplicacao") {
                            scene.operacao = "x";
                        } else if (outer._operacao == "divisao") {
                            scene.operacao = "/";
                            scene.opcao = this._opcao;
                        }

                        scene.nomeJogador = outer.nome;
                        scene.interativo = false;

                        cc.director.runScene(cc.TransitionFade.create(0.5, scene));
                    },
                    this
                );
                itemAutomatico.attr({
                    x: size.width / 2,
                    y: size.height / 2 - 100,
                    scale: 1.0
                });


                var itemVoltar = cc.MenuItemImage.create(
                    res.voltar_branco_png,
                    res.voltar_branco_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        outer.removeChild(layer);
                    },
                    this
                );
                itemVoltar.attr({
                    x: size.width / 2,
                    y: size.height / 2 - 300,
                    scale: 0.8
                });

                var menu = cc.Menu.create(itemInterativo, itemAutomatico, itemVoltar);
                menu.setPosition(0,0);


                layer.addChild(bgSprite);
                layer.addChild(menu);
                outer.addChild(layer);


            },
            this
        );

        itemOk.attr({
            x: size.width / 2 + 200,
            y: size.height / 2 - 395,
            scale: 0.5
        });

        var menu = cc.Menu.create(itemOk, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu);

        var labelTopo = cc.LabelTTF.create("Qual o seu nome?", "Arial", 110);
        labelTopo.x = size.width / 2;
        labelTopo.y = size.height / 2 + 450;

        this.labelNome = cc.LabelTTF.create(this.nome, "Arial", 90);
        this.labelNome.x = size.width / 2;
        this.labelNome.y = size.height / 2 + 320;
        this.labelNome.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        //teclado
        var q = this.criarTecla("Q", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "Q"; outer.atualizarLabelNome(); });
        var w = this.criarTecla("W", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "W"; outer.atualizarLabelNome(); });
        var e = this.criarTecla("E", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "E"; outer.atualizarLabelNome(); });
        var r = this.criarTecla("R", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "R"; outer.atualizarLabelNome(); });
        var t = this.criarTecla("T", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "T"; outer.atualizarLabelNome(); });
        var y = this.criarTecla("Y", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "Y"; outer.atualizarLabelNome(); });
        var u = this.criarTecla("U", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "U"; outer.atualizarLabelNome(); });
        var i = this.criarTecla("I", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "I"; outer.atualizarLabelNome(); });
        var o = this.criarTecla("O", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "O"; outer.atualizarLabelNome(); });
        var p = this.criarTecla("P", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "P"; outer.atualizarLabelNome(); });

        var a = this.criarTecla("A", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "A"; outer.atualizarLabelNome(); });
        var s = this.criarTecla("S", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "S"; outer.atualizarLabelNome(); });
        var d = this.criarTecla("D", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "D"; outer.atualizarLabelNome(); });
        var f = this.criarTecla("F", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "F"; outer.atualizarLabelNome(); });
        var g = this.criarTecla("G", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "G"; outer.atualizarLabelNome(); });
        var h = this.criarTecla("H", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "H"; outer.atualizarLabelNome(); });
        var j = this.criarTecla("J", function() {  cc.audioEngine.playEffect(res.effect_buttonClick_mp3); outer.nome += "J"; outer.atualizarLabelNome(); });
        var k = this.criarTecla("K", function() {  cc.audioEngine.playEffect(res.effect_buttonClick_mp3); outer.nome += "K"; outer.atualizarLabelNome(); });
        var l = this.criarTecla("L", function() {  cc.audioEngine.playEffect(res.effect_buttonClick_mp3); outer.nome += "L"; outer.atualizarLabelNome(); });

        var z = this.criarTecla("Z", function() {  cc.audioEngine.playEffect(res.effect_buttonClick_mp3); outer.nome += "Z"; outer.atualizarLabelNome(); });
        var x = this.criarTecla("X", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "X"; outer.atualizarLabelNome(); });
        var c = this.criarTecla("C", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "C"; outer.atualizarLabelNome(); });
        var v = this.criarTecla("V", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "V"; outer.atualizarLabelNome(); });
        var b = this.criarTecla("B", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "B"; outer.atualizarLabelNome(); });
        var n = this.criarTecla("N", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "N"; outer.atualizarLabelNome(); });
        var m = this.criarTecla("M", function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3);  outer.nome += "M"; outer.atualizarLabelNome(); });
        var backSpace = this.criarTeclaBackspace(function() { cc.audioEngine.playEffect(res.effect_buttonClick_mp3); if (outer.nome.length == 0) { return; }  outer.nome = outer.nome.substring(0, outer.nome.length - 1); outer.atualizarLabelNome(); });


        q.attr({ x: size.width / 2 - 850, y: size.height / 2 + 150});
        w.attr({ x: size.width / 2 - 660, y: size.height / 2 + 150});
        e.attr({ x: size.width / 2 - 470, y: size.height / 2 + 150});
        r.attr({ x: size.width / 2 - 280, y: size.height / 2 + 150});
        t.attr({ x: size.width / 2 - 80, y: size.height / 2 + 150});
        y.attr({ x: size.width / 2 + 110, y: size.height / 2 + 150});
        u.attr({ x: size.width / 2 + 290, y: size.height / 2 + 150});
        i.attr({ x: size.width / 2 + 480, y: size.height / 2 + 150});
        o.attr({ x: size.width / 2 + 670, y: size.height / 2 + 150});
        p.attr({ x: size.width / 2 + 865, y: size.height / 2 + 150});

        a.attr({ x: size.width / 2 - 770, y: size.height / 2 - 35});
        s.attr({ x: size.width / 2 - 580, y: size.height / 2 - 35});
        d.attr({ x: size.width / 2 - 390, y: size.height / 2 - 35});
        f.attr({ x: size.width / 2 - 200, y: size.height / 2 - 35});
        g.attr({ x: size.width / 2 , y: size.height / 2 - 35});
        h.attr({ x: size.width / 2 + 190, y: size.height / 2 - 35});
        j.attr({ x: size.width / 2 + 370, y: size.height / 2 - 35});
        k.attr({ x: size.width / 2 + 560, y: size.height / 2 - 35});
        l.attr({ x: size.width / 2 + 750, y: size.height / 2 - 35});

        z.attr({ x: size.width / 2 - 670, y: size.height / 2 - 220});
        x.attr({ x: size.width / 2 - 480, y: size.height / 2 - 220});
        c.attr({ x: size.width / 2 - 290, y: size.height / 2 - 220});
        v.attr({ x: size.width / 2 - 100, y: size.height / 2 - 220});
        b.attr({ x: size.width / 2 + 100 , y: size.height / 2 - 220});
        n.attr({ x: size.width / 2 + 290, y: size.height / 2 - 220});
        m.attr({ x: size.width / 2 + 480, y: size.height / 2 - 220});
        backSpace.attr({ x: size.width / 2 + 680, y: size.height / 2 - 220});


        this.addChild(labelTopo);
        this.addChild(q);
        this.addChild(w);
        this.addChild(e);
        this.addChild(r);
        this.addChild(t);
        this.addChild(y);
        this.addChild(u);
        this.addChild(i);
        this.addChild(o);
        this.addChild(p);

        this.addChild(a);
        this.addChild(s);
        this.addChild(d);
        this.addChild(f);
        this.addChild(g);
        this.addChild(h);
        this.addChild(j);
        this.addChild(k);
        this.addChild(l);

        this.addChild(z);
        this.addChild(x);
        this.addChild(c);
        this.addChild(v);
        this.addChild(b);
        this.addChild(n);
        this.addChild(m);
        this.addChild(backSpace);

        this.addChild(this.labelNome);



    }
});