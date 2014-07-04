function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function checarFimDeJogo(outer) {

    var pedras = outer.getPedras();
    numeroPedrasOponente = 0;
    numeroPedrasJogador = 0;
    for (i = 0; i < pedras.length; i++) {
        for (j = 0; j < pedras[i].length; j++) {

            var pedra = pedras[i][j];
            if (pedra == null) {
                continue;
            }
            if (pedra.getCor() == "azul") {
                numeroPedrasJogador++;
            } else {
                numeroPedrasOponente++;
            }
        }
    }


    if (numeroPedrasOponente == 0 || numeroPedrasJogador == 0) {
        //Fim de jogo
        var gameOverScene = new GameOverScene();
        gameOverScene.init({ jogador: outer.getParent().getParent().dJogo.nomeJogador, sucesso: (outer.getParent().getParent().dJogo.pontuacaoJogador > outer.getParent().getParent().dJogo.pontuacaoOponente), pontuacao: outer.getParent().getParent().dJogo.pontuacaoJogador});
        cc.director.runScene(cc.TransitionFade.create(0.5, gameOverScene));
        return true;
    }


    return false;

}

function atualizarPlacar(opcaoSelecionada, outer) {

    var resultado = null;
    if (operacao == "+") {

        resultado = numeroPedraJogador + numeroPedraOponente;

    } else if (operacao == "-") {

        resultado = numeroPedraJogador - numeroPedraOponente;

    } else if (operacao == "x") {

        resultado = numeroPedraJogador * numeroPedraOponente;

    } else if (operacao == "/") {

        if (outer.getParent().getParent().opcao == "decimal") {
            resultado = numeroPedraJogador / numeroPedraOponente;
        } else {
            resultado = numeroPedraJogador + "/" + numeroPedraOponente;
        }


    }

    if (alternativas.indexOf(resultado) != opcaoSelecionada) {

        if (operacao == "-") {
            outer.getParent().getParent().dJogo.pontuacaoJogador += resultado;
        } else if (operacao == "/") {
            outer.getParent().getParent().dJogo.pontuacaoJogador += numeroPedraOponente == 0 ? 0 : numeroPedraJogador / numeroPedraOponente;
        } else {
            outer.getParent().getParent().dJogo.pontuacaoOponente += resultado;
        }

    } else {
        if (operacao == "/") {
            outer.getParent().getParent().dJogo.pontuacaoJogador += numeroPedraOponente == 0 ? 0 : numeroPedraJogador / numeroPedraOponente;
        } else {
            outer.getParent().getParent().dJogo.pontuacaoJogador += resultado;
        }

    }

    outer.getParent().getParent().atualizarPontuacao();
    fazerMovimentoComputador(outer);

};

function obterPedrasComputador(outer) {
    var pedras = outer.getPedras();
    var pedrasComputador = [];

    for (i = 0; i < pedras.length; i++) {
        for (j = 0; j < pedras[i].length; j++) {

            var pedra = pedras[i][j];
            if (pedra == null) {
                continue;
            }
            if (pedra.getCor() == "laranja") {
                pedrasComputador.push(pedra);
            }
        }
    }
    return pedrasComputador;
}

function obterPedrasJogador(outer) {
    var pedras = outer.getPedras();
    var pedrasJogador = [];

    for (i = 0; i < pedras.length; i++) {
        for (j = 0; j < pedras[i].length; j++) {

            var pedra = pedras[i][j];
            if (pedra == null) {
                continue;
            }
            if (pedra.getCor() == "azul") {
                pedrasJogador.push(pedra);
            }
        }
    }
    return pedrasJogador;
}


function obterPedrasPassiveisConquista(outer) {

    var pedras = outer.getPedras();
    var pedrasComputador = obterPedrasComputador(outer);
    var passiveisConquista = [];
    for (var i = 0; i < pedrasComputador.length; i++) {

        var p = pedrasComputador[i];

        //Checa diagonal esquerda superior
        try {
            var alvo = pedras[p.linha - 1][p.coluna - 1];
            if (alvo != null && alvo.getCor() === "azul") {
                passiveisConquista.push([p, alvo]);
            }
        } catch (e) {

        }


        //Checa diagonal esquerda inferior
        try {
            var alvo = pedras[p.linha + 1][p.coluna - 1];

            if (alvo != null && alvo.getCor() === "azul") {

                passiveisConquista.push([p, alvo]);
            }
        } catch (e) {

        }


        //Checa diagonal direita superior
        try {
            var alvo = pedras[p.linha - 1][p.coluna + 1];
            if (alvo != null && alvo.getCor() === "azul") {
                passiveisConquista.push([p, alvo]);
            }
        } catch (e) {

        }


        //Checa diagonal direita inferior
        try {
            var alvo = pedras[p.linha + 1][p.coluna + 1];
            if (alvo != null && alvo.getCor() === "azul") {
                passiveisConquista.push([p, alvo]);
            }
        } catch (e) {

        }


    }
    return passiveisConquista;
}

function obterCaminhoMaisCurtoMelhorConquista(outer) {

    var operacao = outer.getParent().getParent().operacao;

    var pedrasComputador = obterPedrasComputador(outer);
    var pedrasJogador = obterPedrasJogador(outer);

    var melhorJogada = null;

    if (operacao == "+" || operacao == "*") {

        pedrasComputador.sort(function(a, b){return b.getNumero() - a.getNumero()});
        pedrasJogador.sort(function(a, b){return b.getNumero() - a.getNumero()});

        out:
        for (var i = 0; i < pedrasComputador.length; i++) {

            var cc = pedrasComputador[i];

            if (cc.linha == 7) {
                continue;
            }
            for (var j = 0; j < pedrasJogador.length; j++) {

                var cj = pedrasJogador[j];


                    var linha = null;
                    if (cj.linha == cc.linha) {
                        linha = cc.linha - 1;
                    } else {
                        linha = cj.linha > cc.linha ? cc.linha + 1 : cc.linha - 1;
                    }

                    if (linha == -1) {
                        linha = 1;
                    }
                    if (linha == 8) {
                        linha = 6;
                    }

                    if (linha < cc.linha) {
                        continue out;
                    }
                    var coluna = null;
                    if (cj.coluna == cc.coluna) {
                        coluna = cc.coluna - 1;
                    } else {
                        coluna = cj.coluna > cc.coluna ? cc.coluna + 1 : cc.coluna - 1;
                    }

                    if (coluna == -1) {
                        coluna = 1;
                    }
                    if (coluna == 11) {
                        coluna = 9;
                    }

                    try {
                        var alvo = outer.getPedras()[linha][coluna];

                        if (alvo == null) {

                            alert(cc.getNumero() + " para " + linha + ", " + coluna);
                            melhorJogada = [cc, linha, coluna];
                            break out;

                        }

                    } catch (e) {

                    }




            }

        }

    } else {


    }


    return melhorJogada;


}

function obterMelhorConquistaPedrasPassiveisConquista(outer, pedrasPassiveis) {


    var operacao = outer.getParent().getParent().operacao;
    var melhorConquista = null;
    if (operacao === "+" || operacao === "*") {

        for (var i = 0; i < pedrasPassiveis.length; i++) {

            var c = pedrasPassiveis[i];
            if (melhorConquista == null) {
                melhorConquista = c;
            } else {
                if (melhorConquista[1].getNumero() < c[1].getNumero()) {
                    melhorConquista = c;
                }
            }

        }

    } else {

        for (var i = 0; i < pedrasPassiveis.length; i++) {

            var c = pedrasPassiveis[i];
            if (melhorConquista == null) {
                melhorConquista = c;
            } else {
                if (melhorConquista[0].getNumero() > c[0].getNumero() && melhorConquista[1].getNumero() < c[1].getNumero()) {
                    melhorConquista = c;
                }
            }

        }

    }


    return melhorConquista;

}

/**
 * Rotina utilizada para obter a pedra da melhor jogada.
 * @param outer
 */
function obterMelhorMovimentoComputador(outer) {

    /*
     * Critérios
     * A melhor jogada será definida sempre pela seguinte ordem:
     * 1 - A pedra de maior ou menor valor passível de conquista.
     * 2 - O caminho mais curto para a melhor conquista.
     */

    var pedrasPassiveisConquista = obterPedrasPassiveisConquista(outer);

    if (pedrasPassiveisConquista.length > 0) {


        //Verifica a melhor pedra a ser conquistada
        var melhorConquista = obterMelhorConquistaPedrasPassiveisConquista(outer, pedrasPassiveisConquista);
        return melhorConquista;

    } else {

        //Obtém o caminho mais curto para melhor conquista.
        return obterCaminhoMaisCurtoMelhorConquista(outer);

    }

}

function fazerConquistaComputador(outer, movimento) {
    var operacao = outer.getParent().getParent().operacao;

    var alvo = movimento[1];
    outer.removeChild(alvo);
    outer.getPedras()[alvo.linha][alvo.coluna] = movimento[0];
    outer.getPedras()[movimento[0].linha][movimento[0].coluna] = null;

    var coluna = movimento[0].coluna;
    var linha = movimento[0].linha;

    dirX = alvo.coluna < movimento[0].coluna ? -1 : 1;
    dirY = alvo.linha < movimento[0].linha ? 1 : -1; //Invertido por causa do sistema de coordenadas do Cocos 2D js

    movimento[0].coluna = alvo.coluna;
    movimento[0].linha = alvo.linha;

    var numeroPedraJogador = alvo.getNumero();
    var numeroPedraComputador = movimento[0].getNumero();


    var resultado = 0;

    if (operacao === "+") {
        resultado = numeroPedraComputador + numeroPedraJogador;
    } else if (operacao === "-") {
        resultado = numeroPedraComputador - numeroPedraJogador;
    } else if (operacao === "x") {
        resultado = numeroPedraComputador * numeroPedraJogador;
    } else if (operacao === "/") {
        resultado = numeroPedraJogador == 0 ? 0 : numeroPedraComputador / numeroPedraJogador;
    }

    outer.getParent().getParent().dJogo.pontuacaoOponente += resultado;


    outer.getParent().getParent().atualizarPontuacao();
    movimento[0].runAction(cc.Spawn.create(cc.MoveBy.create(0.5, 120 * dirX, 120 * dirY)));
    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
}

function fazerMovimentoSimplesComputador(outer, movimento) {

    outer.getPedras()[movimento[1]][movimento[2]] = movimento[0];

    var coluna = movimento[0].coluna;
    var linha = movimento[0].linha;

    outer.getPedras()[linha][coluna] = null;

    var dirX = movimento[2] < coluna ? -1 : 1;
    var dirY = movimento[1] < linha ? 1 : -1; //Invertido por causa do sistema de coordenadas do Cocos 2D js

    if (movimento[1] == 7) {
        dirY = -1; //FIX
    }

    movimento[0].linha = movimento[1];
    movimento[0].coluna = movimento[2];

    movimento[0].runAction(cc.Spawn.create(cc.MoveBy.create(0.5, 120 * dirX, 120 * dirY)));
    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
}

function moverPedraComputador(outer, movimento) {

    if (movimento.length == 2) {
        fazerConquistaComputador(outer, movimento);
    } else {
        fazerMovimentoSimplesComputador(outer, movimento);
    }

    /*var dirX = null;
    var dirY = null;

    if (outer == null) {
        return;
    }

    if (movimento == null) {
        return;
    }

    var operacao = outer.getParent().getParent().operacao;
    try {
        if (movimento.length == 2) {


        } else {

            if (movimento.length == 3) {




            }
        }
    } catch (e) {

    }
*/



}

/**
 * Rotina que encapsula a lógica do adversário "Computador".
 * @param outer
 */
function fazerMovimentoComputador(outer) {
    outer.aguardarComputador = true;

    //Quando for multiplicação ir atrás da maior pedra.
    setTimeout(function () {


        var melhorMovimento = obterMelhorMovimentoComputador(outer);
        moverPedraComputador(outer, melhorMovimento);


        checarFimDeJogo(outer);

        setTimeout(function () {
            outer.aguardarComputador = false;
        }, 400);

    }, 500);
};

/**
 * Tabuleiro para jogos offline.
 */
var TabuleiroOffline = cc.Sprite.extend({
    _pedras: null,
    aguardarComputador: false,
    pedraSelecionada: null,
    getPedras: function () {
        return this._pedras;
    },
    redefinirPedras: function () {

        if (this._pedras != null) {
            for (var i = 0; i < this._pedras.length; i++) {
                for (var j = 0; j < this._pedras[i].length; j++) {
                    var pedra = this._pedras[i][j];
                    if (pedra != null) {
                        this.removeChild(pedra);
                    }
                    this._pedras[i][j] = null;
                }
            }
        }


        //Example, including customisable intervals [lower_bound, upper_bound)
        var limit = 10,
            amount = 11,
            lower_bound = 0,
            upper_bound = 10,
            nl = [],
            na = [];

        if (amount > limit) limit = amount; //Infinite loop if you want more unique
        //Natural numbers than existemt in a
        // given range
        while (nl.length < limit) {
            var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
            if (nl.indexOf(random_number) == -1) {
                // Yay! new random number
                nl.push(random_number);

            }
        }

        while (na.length < limit) {
            var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
            if (na.indexOf(random_number) == -1) {
                // Yay! new random number
                na.push(random_number);

            }
        }

        this._pedras = null;
        p = new Pedra();
        this._pedras = [
            [p.laranja(nl[0], 0, 0), null, p.laranja(nl[1], 0, 2), null, p.laranja(nl[2], 0, 4), null, p.laranja(nl[3], 0, 6), null, p.laranja(nl[4], 0, 7), null, p.laranja(nl[5], 0, 9)],
            [null, p.laranja(nl[6], 1, 1), null, p.laranja(nl[7], 1, 3), null, p.laranja(nl[8], 1, 5), null, p.laranja(nl[9], 1, 7), null, p.laranja(nl[10], 1, 9), null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [p.azul(na[5], 6, 0), null, p.azul(na[6], 6, 2), null, p.azul(na[7], 6, 4), null, p.azul(na[8], 6, 6), null, p.azul(na[9], 6, 8), null, p.azul(na[10], 6, 10)],
            [null, p.azul(na[0], 7, 1), null, p.azul(na[1], 7, 3), null, p.azul(na[2], 7, 5), null, p.azul(na[3], 7, 7), null, p.azul(na[4], 7, 9), null]
        ];
        for (var i = 0; i < this._pedras.length; i++) {
            for (var j = 0; j < this._pedras[i].length; j++) {
                var pedra = this._pedras[i][j];
                if (pedra != null) {
                    this.addChild(pedra);

                }
            }
        }

        this.atualizarTabuleiro();
    },
    atualizarTabuleiro: function () {
        if (this._pedras != null) {
            for (var i = 0; i < this._pedras.length; i++) {
                for (var j = 0; j < this._pedras[i].length; j++) {
                    var pedra = this._pedras[i][j];
                    if (pedra != null) {
                        pedra.setPosition((120 * j), (120 * Math.abs((i - 8))));
                    }
                }
            }
        }
    },
    init: function () {

        var branca = function () {
            var branca = bg = cc.Sprite.create(res.pedra_branca_png);
            branca.attr({
                width: 120,
                height: 120,
                scale: 1.0
            });
            return branca;
        }

        var cinza = function () {
            var cinza = bg = cc.Sprite.create(res.pedra_cinza_png);
            cinza.attr({
                width: 120,
                height: 120,
                scale: 1.0
            });
            return cinza;
        }

        var casas = [
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()]
        ];

        var outer = this;
        for (var i = 0; i < casas.length; i++) {
            for (var j = 0; j < casas[i].length; j++) {
                var casa = casas[i][j];

                casa.setPosition(120 * j, (120 * Math.abs((i - 8))));

                this.addChild(casa);

                if (j + 1 % 2 != 0) {
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



                                var newPxt = 0;
                                var newPyt = 0;
                                out2:
                                    for (i = 0; i < casas.length; i++) {
                                        for (j = 0; j < casas[i].length; j++) {
                                            var casa = casas[i][j];
                                            if (casa != null) {
                                                if (casa == target) {
                                                    newPxt = j;
                                                    newPyt = i;
                                                    break out2;
                                                }

                                            }
                                        }
                                    }


                                if (outer.pedraSelecionada == null) {
                                    return false;
                                }


                                if (outer.pedraSelecionada.linha < newPyt) {
                                    return false;
                                }

                                var dirX = outer.pedraSelecionada.coluna < newPxt ? 120 : -120;
                                var dirY = outer.pedraSelecionada.linha < newPyt ? -120 : 120;


                                if (outer.pedraSelecionada.getColuna() == 0 && dirX < 0 || outer.pedraSelecionada.getLinha() == 7 && dirX < 0) {
                                    return;
                                }

                                var pedraAlvo = outer.getPedras()[newPyt][newPxt];
                                if (pedraAlvo != null) {

                                    if (pedraAlvo.getCor() == "azul") {
                                        return true;
                                    }
                                }

                                outer.removeChild(outer.getPedras()[newPyt][newPxt]);
                                outer.getPedras()[newPyt][newPxt] = outer.pedraSelecionada;
                                outer.getPedras()[outer.pedraSelecionada.linha][outer.pedraSelecionada.coluna] = null;

                                if (pedraAlvo != null) {

                                    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                                    operacao = outer.getParent().getParent().operacao;
                                    numeroPedraJogador = outer.pedraSelecionada.getNumero();
                                    numeroPedraOponente = pedraAlvo.getNumero();
                                    alternativas = [];
                                    if (outer.getParent().getParent().modo == "interativo") {


                                        if (operacao == "+") {

                                            alternativas.push(numeroPedraJogador + numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador + Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "-") {
                                            alternativas = [];
                                            alternativas.push(numeroPedraJogador - numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador - Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "x") {
                                            alternativas = [];
                                            alternativas.push(numeroPedraJogador * numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador * Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "/") {
                                            alternativas = [];

                                            if (outer.getParent().getParent().opcao == "decimal") {
                                                alternativas.push(numeroPedraJogador / numeroPedraOponente);
                                                while (alternativas.length < 4) {
                                                    var n = numeroPedraJogador / Math.floor(Math.random() * 10);
                                                    if (alternativas.indexOf(n) != -1) {
                                                        continue;
                                                    } else {
                                                        alternativas.push(n);
                                                    }
                                                }
                                                alternativas = shuffle(alternativas);
                                            } else {

                                                alternativas.push(numeroPedraJogador + "/" + numeroPedraOponente);
                                                while (alternativas.length < 4) {
                                                    var n = numeroPedraJogador + "/" + Math.floor(Math.random() * 10);
                                                    if (alternativas.indexOf(n) != -1) {
                                                        continue;
                                                    } else {
                                                        alternativas.push(n);
                                                    }
                                                }
                                                alternativas = shuffle(alternativas);

                                            }


                                        }


                                        var size = cc.director.getWinSize();
                                        //Mostra diálogo de seleção de opções
                                        var layer = cc.Layer.create();
                                        //BG
                                        var bgSprite = cc.Sprite.create(res.GameBackground_png);
                                        bgSprite.attr({
                                            x: size.width / 2,
                                            y: size.height / 2,
                                            scale: 0.2
                                        });
                                        var scaleToA = cc.ScaleTo.create(0.5, 0.5, 0.5);
                                        bgSprite.runAction(cc.Sequence.create(scaleToA));
                                        layer.addChild(bgSprite);
                                        outer.getParent().addChild(layer);

                                        pergunta = cc.LabelTTF.create(numeroPedraJogador + " " + operacao + " " + numeroPedraOponente + " = ?", "Arial", 130);
                                        pergunta.x = bgSprite.width / 2;
                                        pergunta.y = bgSprite.height - 200;
                                        pergunta.setColor(cc.color(59, 196, 243));
                                        bgSprite.addChild(pergunta);


                                        opcaoA = cc.LabelTTF.create(alternativas[0] + "", "Arial", 130);
                                        opcaoA.x = bgSprite.width / 2 - 400;
                                        opcaoA.y = bgSprite.height - 400;
                                        opcaoA.setColor(cc.color(22, 22, 22));


                                        opcaoB = cc.LabelTTF.create(alternativas[1] + "", "Arial", 130);
                                        opcaoB.x = bgSprite.width / 2 + 400;
                                        opcaoB.y = bgSprite.height - 400;
                                        opcaoB.setColor(cc.color(22, 22, 22));

                                        opcaoC = cc.LabelTTF.create(alternativas[2] + "", "Arial", 130);
                                        opcaoC.x = bgSprite.width / 2 - 400;
                                        opcaoC.y = bgSprite.height - 800;
                                        opcaoC.setColor(cc.color(22, 22, 22));

                                        opcaoD = cc.LabelTTF.create(alternativas[3] + "", "Arial", 130);
                                        opcaoD.x = bgSprite.width / 2 + 400;
                                        opcaoD.y = bgSprite.height - 800;
                                        opcaoD.setColor(cc.color(22, 22, 22));

                                        var l1 = cc.EventListener.create({
                                            event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                            swallowTouches: true,
                                            onTouchBegan: function (touch, event) {

                                                var target = event.getCurrentTarget();

                                                //Get the position of the current point relative to the button
                                                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                                                var s = target.getContentSize();
                                                var rect = cc.rect(0, 0, s.width, s.height);


                                                //Se acertar você ganha pontos. Se você errar o adversário ganha pontos.


                                                //Check the click area
                                                if (cc.rectContainsPoint(rect, locationInNode)) {
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(0, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l1, opcaoA);

                                        var l2 = cc.EventListener.create({
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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(1, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l2, opcaoB);

                                        var l3 = cc.EventListener.create({
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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(2, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l3, opcaoC);

                                        var l4 = cc.EventListener.create({
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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(3, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l4, opcaoD);


                                        bgSprite.addChild(opcaoA);
                                        bgSprite.addChild(opcaoB);
                                        bgSprite.addChild(opcaoC);
                                        bgSprite.addChild(opcaoD);

                                        layer.addChild(bgSprite);
                                    } else {
                                        var r = null;
                                        if (operacao == "+") {

                                            r = numeroPedraJogador + numeroPedraOponente;

                                        } else if (operacao == "-") {

                                            r = numeroPedraJogador - numeroPedraOponente;

                                        } else if (operacao == "x") {

                                            r = numeroPedraJogador * numeroPedraOponente;

                                        } else if (operacao == "/") {

                                            r = numeroPedraJogador / numeroPedraOponente;

                                        }

                                        alternativas.push(r);
                                        atualizarPlacar(0, outer)
                                    }

                                    function obterMaiorPedra(pedras) {
                                        var maiorPedra = null;
                                        for (i = 0; i < pedras.length; i++) {
                                            if (maiorPedra == null) {
                                                maiorPedra = pedras[i];
                                                continue;
                                            } else {
                                                var pedra = pedras[i];
                                                if (pedra.getNumero() > maiorPedra.getNumero()) {
                                                    maiorPedra = pedra;
                                                    continue;
                                                }
                                            }
                                        }
                                        return maiorPedra;
                                    }


                                    function obterMenorPedra(pedras) {
                                        var maiorPedra = null;
                                        for (i = 0; i < pedras.length; i++) {
                                            if (maiorPedra == null) {
                                                maiorPedra = pedras[i];
                                                continue;
                                            } else {
                                                var pedra = pedras[i];
                                                if (pedra.getNumero() < maiorPedra.getNumero()) {
                                                    maiorPedra = pedra;
                                                    continue;
                                                }
                                            }
                                        }
                                        return maiorPedra;
                                    }

                                    function obterDirecaoX(pedraComputador, pedraOponente) {
                                        if (pedraOponente.getColuna() >= pedraComputador.getColuna()) {
                                            if (pedraComputador.getColuna() == 10) {
                                                return -1;
                                            }
                                            return 1;
                                        } else {
                                            if (pedraComputador.getColuna() == 0) {
                                                return 1;
                                            }
                                            return -1;
                                        }
                                    }

                                    function obterDirecaoY(pedraComputador, pedraOponente) {
                                        if (pedraOponente.getLinha() >= pedraComputador.getLinha()) {
                                            if (pedraComputador.getLinha() == 7) {
                                                return 1;
                                            }
                                            return -1;
                                        } else {
                                            if (pedraComputador.getLinha() == 0) {
                                                return -1;
                                            }
                                            return 1;
                                        }
                                    }


                                } else {
                                    fazerMovimentoComputador(outer);
                                }

                                outer.pedraSelecionada.coluna = newPxt;
                                outer.pedraSelecionada.linha = newPyt;

                                outer.pedraSelecionada.runAction(cc.Spawn.create(cc.MoveBy.create(0.5, dirX, dirY)));

                                outer.pedraSelecionada.getChildren()[0].opacity = 255;

                                outer.pedraSelecionada = null;

                                return true;
                            }
                            return false;
                        },
                        onTouchEnded: function (touch, event) {
                        }
                    });
                    cc.eventManager.addListener(listener1, casa);
                }

            }
        }


        this.redefinirPedras();
    }
});
