/* Como jogar */
var ComoJogarLayer = cc.LayerColor.extend({
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

        var texto = "         - 1. O tabuleiro contém 11 (onze) peças numeradas de 0 (zero) a 10 (dez) para cada jogador,\n \
            distribuídas aleatoriamente.\n \
            - 2. Para iniciar o jogo click na operação desejada:\n\
            - 2.1. OPERAÇÃO: soma - subtração – multiplicação-divisão.\n\
            - 3. O jogo começa movimentando as peças em sentido diagonal para frente, ocupando as casas seguintes,\n\
             não sendo permitido voltar a(s) casa(s) anterior(es).\n\
        - 4. A luz acesa no painel indica o jogador da vez.\n\
        - 5. Cada jogador tem direito a um movimento de cada vez.\n\
        - 6. Quando as PEÇAS ADVERSÁRIAS se confrontarem, o jogador da vez TEM A OBRIGAÇÃO DE CONQUISTAR A PEÇA\n \
        ADVERSÁRIA, devendo fazê-lo também na casa anterior.\n\
        - 7. O jogador deverá selecionar no painel a resposta da operação corretamente para a obtenção de pontuação\n \
        no placar e prosseguimento da jogada. Caso não selecione corretamente, a pontuação resultante da operação irá \n\
        para o placar adversário.\n\
            Caso não saiba a resposta poderá consultar a ajuda, porém não obterá pontuação no placar para ambas as partes.\n\
        - 8. A conquista se realiza com a ocupação da casa da peça adversária, após a seleção da resposta aparecerá no \n\
        painel o calculo da operação e os pontos serão adicionados instantaneamente no placar.\n\
        - 9. O vencedor será aquele que obtiver maior pontuação nas operações matemáticas, independentemente \n\
        do número de peças finais no tabuleiro.\n\
        - 10. No jogo da subtração, caso o jogador selecione a resposta errada e se o valor correto seja acima \n\
        de 0 (zero), a pontuação irá para o placar adversário. Se for abaixo de 0 (zero), irá para o jogador.\n";

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


        var sobreLabel = cc.LabelTTF.create(texto, "Arial", 30);
        sobreLabel.setColor(cc.color(59, 196, 243));
        //sobreLabel.setColor(cc.color3(255,0,0));
        sobreLabel.x = size.width / 2;
        sobreLabel.y = size.height / 2 + 50;
        sobreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        // add the label as a child to this layer
        this.addChild(sobreLabel, 5);

        var menu = cc.Menu.create(itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);

        return true;
    }
});

var ComoJogarScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new ComoJogarLayer());
    }
});
