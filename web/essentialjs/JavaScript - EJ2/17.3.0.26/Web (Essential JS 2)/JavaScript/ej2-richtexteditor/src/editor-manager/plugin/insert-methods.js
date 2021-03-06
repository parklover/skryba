/**
 * Node appending methods.

 */
var InsertMethods = /** @class */ (function () {
    function InsertMethods() {
    }
    InsertMethods.WrapBefore = function (textNode, parentNode, isAfter) {
        parentNode.innerText = textNode.textContent;
        (!isAfter) ? this.AppendBefore(parentNode, textNode) : this.AppendBefore(parentNode, textNode, true);
        if (textNode.parentNode) {
            textNode.parentNode.removeChild(textNode);
        }
        return parentNode.childNodes[0];
    };
    InsertMethods.Wrap = function (childNode, parentNode) {
        this.AppendBefore(parentNode, childNode);
        parentNode.appendChild(childNode);
        return childNode;
    };
    InsertMethods.unwrap = function (node) {
        var parent = node.parentNode;
        var child = [];
        for (; node.firstChild; null) {
            child.push(parent.insertBefore(node.firstChild, node));
        }
        parent.removeChild(node);
        return child;
    };
    InsertMethods.AppendBefore = function (textNode, parentNode, isAfter) {
        return (parentNode.parentNode) ? ((!isAfter) ? parentNode.parentNode.insertBefore(textNode, parentNode)
            : parentNode.parentNode.insertBefore(textNode, parentNode.nextSibling)) :
            parentNode;
    };
    return InsertMethods;
}());
export { InsertMethods };
