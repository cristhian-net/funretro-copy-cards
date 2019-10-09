const cardsByGroup = [];
let interval;
let textarea;
const lineBreak = "\n";
$( document ).ready(function() {
    interval = setInterval(searchAndCollectCards, 1000);  
});

function searchAndCollectCards() {
    if($(".message-body>.text").length > 0) {
        clearInterval(interval);

        insertHiddenTextArea();

        const groupList = $(".message-list");

        groupList.each(function(){
            const cardByGroup = {
                groupName: $(this).find(".column-header>h2>span.ng-binding").text(),
                cards: []
            };
            const allCardsText = $(this).find(".message-body>.text");
            allCardsText.each(function() {
                cardByGroup.cards.push($(this).text());
            });
            cardsByGroup.push(cardByGroup);
        });

        
        const shareButton = $(".normal-button.import-btn.copy-clipboard");
        $(`
            <button type="button" class="normal-button import-btn"
                style="background-color:#e91e63;border-bottom:1px solid white;">
                Copy to clipboard
            </button>
        `).click(copyCardsToClipboard).insertBefore(shareButton);
    }
}

function insertHiddenTextArea() {
    textarea = $(`<textarea id="allCardsTextArea" style="visibility:hidden;"></textarea>`);
    $("body").append(textarea);
}
function copyCardsToTextarea() {
    let text = "";
    cardsByGroup.forEach(group => {
        text += group.groupName + lineBreak + "=============" + lineBreak;
        group.cards.forEach(card => {
            text += card + lineBreak + lineBreak;
        });
    });
    textarea.val(text);
}

function copyCardsToClipboard() {
    copyCardsToTextarea();
    $(textarea).removeAttr("style").select();
    textareaEl = textarea[0];
    textareaEl.setSelectionRange(0, 999999);

    console.log(textarea.val());

    document.execCommand("copy");
    $(textarea).hide();
    alert('Copied all to clipboard!');
}