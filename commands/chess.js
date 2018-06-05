const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let emojis = {
        blankWhite: "<:a:450353055704154113>",
        blankBlack: "<:a:450353088331513857>",
        whitePawnWhite: "<:a:450353259622826020>",
        whitePawnBlack: "<:a:450353490812862479>",
        whiteRookWhite: "<:a:450353632517423114>",
        whiteRookBlack: "<:a:450353733600280577>",
        whiteBishopWhite: "<:a:450353902177484803>",
        whiteBishopBlack: "<:a:450354007945510926>",
        whiteKnightWhite: "<:a:450354226758156288>",
        whiteKnightBlack: "<:a:450354273721778202>",
        whiteQueenWhite: "<:a:450354468903452704>",
        whiteQueenBlack: "<:a:450354482157453312>",
        whiteKingWhite: "<:a:450354667336105985>",
        whiteKingBlack: "<:a:450354732859392012>",
        blackPawnWhite: "<:a:450356739724804138>",
        blackPawnBlack: "<:a:450356754207735811>",
        blackRookWhite: "<:a:450356976350789633>",
        blackRookBlack: "<:a:450356990061969409>",
        blackBishopWhite: "<:a:450357186623701002>",
        blackBishopBlack: "<:a:450357186640609289>",
        blackKnightWhite: "<:a:450357521748721694>",
        blackKnightBlack: "<:a:450357592544378880>",
        blackQueenWhite: "<:a:450357741693829142>",
        blackQueenBlack: "<:a:450357794886123560>",
        blackKingWhite: "<:a:450357964511903772>",
        blackKingBlack: "<:a:451755461126127628>",
        letterA: "<:a:451756181170421760>",
        letterB: "<:a:451756921595232256>",
        letterC: "<:a:451757319261257729>",
        letterD: "<:a:451757470520705035>",
        letterE: "<:a:451757575462191125>",
        letterF: "<:a:451757787760951307>",
        letterG: "<:a:451757970703908904>",
        letterH: "<:a:451758177365655552>",
        number1: "<:a:451763128942723084>",
        number2: "<:a:451763604933443596>",
        number3: "<:a:451763657446260736>",
        number4: "<:a:451763696465608714>",
        number5: "<:a:451763748160405506>",
        number6: "<:a:451763803458240513>",
        number7: "<:a:451763845426446336>",
        number8: "<:a:451763884433604618>",
    }

    let row8 = `${emojis.blackRookWhite}${emojis.blackKnightBlack}${emojis.blackBishopWhite}${emojis.blackQueenBlack}${emojis.blackKingWhite}${emojis.blackBishopBlack}${emojis.blackKnightWhite}${emojis.blackRookBlack}`;
    let row7 = `${emojis.blackPawnBlack}${emojis.blackPawnWhite}${emojis.blackPawnBlack}${emojis.blackPawnWhite}${emojis.blackPawnBlack}${emojis.blackPawnWhite}${emojis.blackPawnBlack}${emojis.blackPawnWhite}`;
    let row6 = `${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}`;
    let row5 = `${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}`;
    let row4 = `${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}`;
    let row3 = `${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}${emojis.blankBlack}${emojis.blankWhite}`;
    let row2 = `${emojis.whitePawnWhite}${emojis.whitePawnBlack}${emojis.whitePawnWhite}${emojis.whitePawnBlack}${emojis.whitePawnWhite}${emojis.whitePawnBlack}${emojis.whitePawnWhite}${emojis.whitePawnBlack}`;
    let row1 = `${emojis.whiteRookBlack}${emojis.whiteKnightWhite}${emojis.whiteBishopBlack}${emojis.whiteQueenWhite}${emojis.whiteKingBlack}${emojis.whiteBishopWhite}${emojis.whiteKnightBlack}${emojis.whiteRookWhite}`;

    let chessEmbed = new Discord.RichEmbed()
    .setDescription(`${row8}${emojis.number8}\n${row7}${emojis.number7}\n${row6}${emojis.number6}\n${row5}${emojis.number5}\n${row4}${emojis.number4}\n${row3}${emojis.number3}\n${row2}${emojis.number2}\n${row1}${emojis.number1}\n${emojis.letterA}${emojis.letterB}${emojis.letterC}${emojis.letterD}${emojis.letterE}${emojis.letterF}${emojis.letterG}${emojis.letterH}`)

    message.channel.send(chessEmbed);
}

module.exports.help = {
    name: "chess",
    desc: "Display a chess board",
    group: "Fun"
}