function bgChange(thisColor) {
    newColor = thisColor.options[thisColor.selectedIndex].text;
    document.bgColor = newColor;
}