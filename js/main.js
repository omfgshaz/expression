$("#convert").click(function(){
    var processedInput = processInput($("#input").val());
    var convertedInput = convertToEmoji(processedInput);

    renderOutput(convertedInput);
});

function processInput(rawInput) {
    var processedInput = rawInput.split(" ");

    return processedInput;
}

function convertToEmoji(input) {
    var convertedInput = [];

    for (let word of input){

        var found = false;
        var isLastCharSymbol = false;
        var lastChar = word.charAt(word.length - 1);
        var purifiedWord = word;

        if (lastChar.search(/[!.,()@#$%^&*-?]/) >= 0){
            purifiedWord = word.slice(0, word.length - 1);
            isLastCharSymbol = true;
        }

        for (let emoji in emojiData) {
            if (purifiedWord.toLowerCase() == emoji){
                var emojiWord = {
                    keyword: purifiedWord.toLowerCase(),
                    index: 0
                }

                convertedInput.push(emojiWord);

                if (isLastCharSymbol){
                    convertedInput.push(lastChar);
                }

                found = true;

                break;
            }
        }

        if (!found){
            if (isLastCharSymbol){
                convertedInput.push(purifiedWord + lastChar);
            }
            else{
                convertedInput.push(purifiedWord);
            }
        }
    }

    return convertedInput;
}

function renderOutput(output) {
    // Clear the output.
    $("#output").text("");

    var renderedOutput = [];

    for (let word of output ){

        var spanElement = document.createElement("span");

        // If word ain't emoji enabled then don't add attributes to the span element.
        if (word.keyword === undefined){
            spanElement.textContent = word;
        }
        else {
            spanElement.setAttribute("class", "emoji-enabled");
            spanElement.setAttribute("emoji-keyword", word.keyword);
            spanElement.setAttribute("emoji-no", word.index);

            spanElement.textContent = emojiData[word.keyword][word.index];

            $(spanElement).click(function(){
                let element = output[$(this).index()];

                element.index++;

                // If index is more than the maximum index reset to 0.
                if (element.index >= emojiData[element.keyword].length) {
                    element.index = 0;
                }

                renderOutput(output);
            });
        }

        renderedOutput.push(spanElement);
    }

    // Append all elements to output.
    for (let element of renderedOutput){
        $("#output").append(element);
    }

    return renderedOutput;
}
