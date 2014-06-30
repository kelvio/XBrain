
/* Sobre o jogo */
var SobreOJogoLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);


        var texto = "          \"O XBrain é uma verdadeira obra para aprender e se divertir com a matemática.\n \
        Trata-se de um jogo que articula com perfeição e precisão os\n \
        princípios atuais e mais adequados acerca da aprendizagem e\n \
        desenvolvimento dos conceitos de quantificação, valores e equivalências\n \
        das operações: adição, subtração, multiplicação e divisão. \n\n\
        Tenho o privilégio de apresentar este jogo, como um material de primeira qualidade \n\
        que consegue articular com leveza e profundidade: teoria e prática.\n\n \
        O conhecimento se constrói num processo...\n \
        O desafio presente neste jogo está em favorecer ao maior número de pessoas\n \
        a oportunidade de conhecer a matemática numa linguagem ainda mais interessante:\n \
        a da inclusão digital.\n \
        Divertir e aprender com X-Brain é entrar em contato com a nova visão \n \
        paradigmática da sociedade pós-moderna: Isento de tensões, porém pleno de \n \
        desafios e reinvenção de conceitos.\"\n\n \
        Adélia Marise Ferreira Monti\n \
        Pedagoga - Especialista em Piscologia da Aprendizagem e do Desenvolvimento Humano\n \
        Educação Especial Psicopedagogia\n \
        Mestre em Psicologia pela Universidade Católica de Brasília / Pesquisadora da Educação \n \
        Superior - CAPES / Ministério da Educação - Brazil.\n\n \
        Brasilia-DF – Brasil";

        var sobreLabel = cc.LabelTTF.create(texto, "Arial", 30);
        sobreLabel.setColor(cc.color(59, 196, 243));
        //sobreLabel.setColor(cc.color3(255,0,0));
        sobreLabel.x = size.width / 2;
        sobreLabel.y = size.height / 2 + 50;
        sobreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        // add the label as a child to this layer
        this.addChild(sobreLabel, 5);

        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {

                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: 100,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);

        return true;
    }
});

var SobreOJogoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new SobreOJogoLayer());
    }
});
