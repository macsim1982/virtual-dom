// https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  
  const $el = document.createElement(node.type);

  for (let i in node.props) {

    $el.removeAttribute(i);
  }

  for (let i in node.props) {
    $el.setAttribute(i, node.props[i]);
  }

  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
  
}

function changed(node1, node2) {
  
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type;
}

export default function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    if ($parent && $parent.childNodes[index]) {
      

      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
      

      if (newNode.props === null && oldNode.props) {
        for (let key in oldNode.props) {
          if ($parent.childNodes[index].hasAttribute(key))
            $parent.childNodes[index].removeAttribute(key);
        }
      }
      
      for (let key in oldNode.props) {
        if (newNode.props && !newNode.props[key])
         if ($parent.childNodes[index].hasAttribute(key))
            $parent.childNodes[index].removeAttribute(key);
      }
      
      for (let key in newNode.props) {
        if (newNode.props !== oldNode.props) {
            $parent.childNodes[index].setAttribute(key, newNode.props[key]);
        }
      }
    }
  }
}

