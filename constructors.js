// exports.x="test";

exports.basic = function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}


exports.cloze = function ClozeCard(clozedeletion, partialtext) {
    this.clozedeletion = clozedeletion;
    this.partialtext = partialtext;
    this.fullText = clozedeletion + " " + partialtext;
}

